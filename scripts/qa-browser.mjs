import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
for(let attempt=0;attempt<50;attempt++) { try { await fetch('http://127.0.0.1:4173/'); break; } catch { await new Promise(r=>setTimeout(r,100)); } }
const out='../audit-output'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({...(process.env.CI ? {} : {channel:'chrome'}),headless:true});
const results=[];
for (const width of [390,1366]) {
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error' && /Content Security Policy|Refused/.test(m.text())) errors.push(m.text());});
 for (const route of ['/','/colegio/','/publicidad/','/trabajo/']) {
  await page.goto('http://127.0.0.1:4173'+route); await page.waitForTimeout(1200);
  await page.screenshot({path:out+'/'+width+'-'+(route.split('/')[1]||'home')+'.png',fullPage:true});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete && !i.naturalWidth).map(i=>i.src));
  results.push({width,route,overflow,broken,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  if(route==='/colegio/') {
   const trigger=page.locator('.gallery-card').first();await trigger.click();await page.locator('dialog').waitFor({state:'visible'});
   await page.keyboard.press('Tab');
   if(!(await page.locator('dialog').evaluate(d=>d.contains(document.activeElement)))) throw Error('Modal focus escapes');
   await page.keyboard.press('Escape');
   if(!(await trigger.evaluate(t=>t===document.activeElement))) throw Error('Focus not restored');
  }
 }
 results.push({width,errors}); await context.close();
}
const page=await browser.newPage();
await page.route('https://api.textilmaguimel.com.ar/contact.php',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:false})}));
await page.goto('http://127.0.0.1:4173/');
await page.locator('[name=name]').fill('Prueba local');await page.locator('[name=email]').fill('test@example.com');await page.locator('[name=message]').fill('Prueba simulada sin envio');await page.getByRole('button',{name:'Enviar consulta'}).click();await page.getByRole('alert').waitFor();
await page.unroute('https://api.textilmaguimel.com.ar/contact.php');
await page.route('https://api.textilmaguimel.com.ar/contact.php',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true})}));
await page.getByRole('button',{name:'Enviar consulta'}).click();await page.getByRole('status').waitFor();
results.push({form:'mock success and failure passed, no real mail sent'});
await browser.close();await writeFile(out+'/browser.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.overflow || r.broken?.length || r.errors?.length || r.violations?.length)) process.exitCode=1;

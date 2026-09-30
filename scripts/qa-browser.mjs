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
  for (const section of await page.locator('main > section, main > footer').all()) {
    await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(80);
  }
  await page.locator('.studio-credit').scrollIntoViewIfNeeded(); await page.waitForTimeout(150);
  if (await page.locator('.whatsapp-float').evaluate(e=>getComputedStyle(e).visibility) !== 'hidden') throw Error('WhatsApp overlaps footer credit');
  if (await page.locator('.studio-credit').getAttribute('href') !== 'https://ideamos.com.ar') throw Error('Incorrect studio link');
  await page.screenshot({path:out+'/'+width+'-'+(route.split('/')[1]||'home')+'-footer.png'});
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'})); await page.waitForTimeout(150);
  if (await page.locator('.whatsapp-float').evaluate(e=>getComputedStyle(e).visibility) !== 'visible') throw Error('WhatsApp did not return');
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
const motionPage=await browser.newPage({viewport:{width:390,height:844}});
await motionPage.clock.install();
await motionPage.goto('http://127.0.0.1:4173/');
await motionPage.clock.fastForward(5000);
await motionPage.getByRole('button',{name:'Pausar imágenes'}).click();
await motionPage.clock.fastForward(24000);
if (!await motionPage.locator('.hero-slide--school').evaluate(e=>e.classList.contains('hero-slide--active'))) throw Error('Pause failed');
await motionPage.getByRole('button',{name:'Reanudar imágenes'}).click();
await motionPage.clock.fastForward(12000);
if (!await motionPage.locator('.hero-slide--second').evaluate(e=>e.classList.contains('hero-slide--active'))) throw Error('Resume failed');
await motionPage.emulateMedia({reducedMotion:'reduce'});
await motionPage.locator('.mobile-nav summary').click();
await motionPage.locator('.mobile-nav a[href="#contacto"]').click();
await motionPage.clock.fastForward(1000);
if (await motionPage.locator('.contact').evaluate(e=>Math.abs(e.getBoundingClientRect().top)) > 100) throw Error('Contact anchor navigation failed');
await motionPage.goto('http://127.0.0.1:4173/');
await motionPage.locator('.mobile-nav summary').click();
await motionPage.locator('.mobile-nav a[href="./colegio/"]').click();
await motionPage.waitForURL('**/colegio/');
await motionPage.close();
results.push({interactions:'Pause, resume and mobile navigation passed'});
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

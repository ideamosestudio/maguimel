import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const server=spawn('php',['-S','127.0.0.1:4175','-t','cpanel'],{stdio:'ignore'});
const endpoint='http://127.0.0.1:4175/contact.php';
try {
  for(let attempt=0;attempt<30;attempt++) { try { await fetch(endpoint); break; } catch { await delay(100); } }
  const send=async(fields, status, origin='https://textilmaguimel.com.ar')=>{
    const res=await fetch(endpoint,{method:'POST',headers:{Origin:origin},body:new URLSearchParams(fields)});
    assert.equal(res.status,status);
    assert.equal(res.headers.get('x-content-type-options'),'nosniff');
    assert.equal((await res.json()).ok,status===200);
  };
  assert.equal((await fetch(endpoint)).status,405);
  await send({},422);
  await send({'name[]':'test',email:'test@example.com',message:'test'},422);
  await send({name:'x'.repeat(121)},422);
  await send({name:'test',email:'test@example.com\r\nBcc: other@example.com',message:'test'},422);
  await send({name:'test',email:'test@example.com',message:'test',inquiry_type:'invalid'},422);
  await send({website:'bot'},200);
  await send({},403,'https://untrusted.example');
  await send({message:'x'.repeat(17000)},413);
  console.log('PASS: PHP rejects malformed, oversized and foreign-origin requests; honeypot returns without sending mail.');
} finally { server.kill(); }

import {test,expect} from '@playwright/test';
import {NextRequest} from 'next/server';
import {POST} from '../src/app/api/robo-ryan/speech/route';

const request=(body:unknown,origin='https://example.com')=>new NextRequest('https://example.com/api/robo-ryan/speech',{method:'POST',headers:{origin},body:JSON.stringify(body)});
test('speech validates requests, keeps credentials server-side, and handles provider failure',async()=>{
  const original=global.fetch,key=process.env.OPENAI_API_KEY,enabled=process.env.ROBO_RYAN_TTS_ENABLED;
  let calls=0,payload:Record<string,unknown>={};
  try {
    delete process.env.OPENAI_API_KEY;
    delete process.env.ROBO_RYAN_TTS_ENABLED;
    global.fetch=async(_url,init)=>{calls++;payload=JSON.parse(String(init?.body));return new Response(new Uint8Array([73,68,51]),{headers:{'Content-Type':'audio/mpeg'}})};
    expect((await POST(request({text:'Hello'}))).status).toBe(503);
    process.env.OPENAI_API_KEY='test-only';
    expect((await POST(request({text:'Hello'},'https://other.example'))).status).toBe(403);
    expect((await POST(request({text:'Hello'},''))).status).toBe(403);
    expect((await POST(request({text:'x'.repeat(6001)}))).status).toBe(400);
    expect((await POST(request({text:'x'.repeat(28001)}))).status).toBe(413);
    expect((await POST(request({text:42}))).status).toBe(400);
    expect(calls).toBe(0);
    const response=await POST(request({text:'Hello',voice:'untrusted',model:'untrusted'}));
    expect(response.status).toBe(200);expect(response.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(payload).toMatchObject({model:'gpt-4o-mini-tts',voice:'cedar',input:'Hello',response_format:'mp3'});
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([73,68,51]));
    global.fetch=async()=>new Response('provider-secret',{status:401});
    const failed=await POST(request({text:'Hello'}));expect(failed.status).toBe(502);expect(await failed.text()).not.toContain('provider-secret');
    process.env.ROBO_RYAN_TTS_ENABLED='false';expect((await POST(request({text:'Hello'}))).status).toBe(503);
  } finally {global.fetch=original;if(key===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=key;if(enabled===undefined)delete process.env.ROBO_RYAN_TTS_ENABLED;else process.env.ROBO_RYAN_TTS_ENABLED=enabled}
});

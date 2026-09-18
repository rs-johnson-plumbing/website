import {test, expect} from '@playwright/test';
import {NextRequest} from 'next/server';
import {POST as answer} from '../src/app/api/robo-ryan/route';
import {POST as followUp} from '../src/app/api/robo-ryan/follow-up/route';
import copy from '../content/robo-ryan-followup.json';

const payload = {email: 'visitor@example.com', requestId: '12345678-1234-1234-1234-123456789012', messages: [{role: 'user', content: 'Can you research this question?'}]};
const request = (body: unknown, origin = 'https://example.com') => new NextRequest('https://example.com/api/robo-ryan/follow-up', {method: 'POST', headers: {origin}, body: JSON.stringify(body)});
test('unconfigured chat never invokes a paid provider', async () => {
  const originalFetch = global.fetch, original = process.env.ROBO_RYAN_AI_ENABLED, originalKey = process.env.OPENAI_API_KEY;
  let calls = 0;
  process.env.ROBO_RYAN_AI_ENABLED = 'true'; delete process.env.OPENAI_API_KEY;
  global.fetch = async () => {calls++; throw new Error('Unexpected provider call')};
  try {
    const result = await (await answer(new NextRequest('https://example.com/api/robo-ryan', {method: 'POST', body: JSON.stringify({messages: [{role: 'user', content: 'What does zqxv mean?'}]})}))).json();
    expect(result.reply).toContain(copy.unknown); expect(result.followUp).toBe(true); expect(calls).toBe(0);
  } finally {global.fetch = originalFetch; if(original === undefined) delete process.env.ROBO_RYAN_AI_ENABLED; else process.env.ROBO_RYAN_AI_ENABLED = original; if(originalKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = originalKey}
});
test('follow-up requires configuration and provider acceptance; recipient cannot be changed', async () => {
  const keys = ['ROBO_RYAN_FOLLOWUP_ENABLED', 'RESEND_API_KEY', 'ROBO_RYAN_FOLLOWUP_FROM'];
  const original = Object.fromEntries(keys.map(k => [k, process.env[k]])), originalFetch = global.fetch;
  let sent: Record<string, unknown> = {}, idempotency = '', calls = 0;
  try {
    delete process.env.ROBO_RYAN_FOLLOWUP_ENABLED;
    expect((await followUp(request(payload))).status).toBe(503);
    process.env.ROBO_RYAN_FOLLOWUP_ENABLED = 'true'; process.env.RESEND_API_KEY = 'test-only'; process.env.ROBO_RYAN_FOLLOWUP_FROM = 'sender@example.com';
    global.fetch = async (_url, init) => {calls++; sent = JSON.parse(String(init?.body)); idempotency = new Headers(init?.headers).get('Idempotency-Key') ?? ''; return Response.json({id: 'accepted-test'})};
    expect((await followUp(request(payload, 'https://evil.example'))).status).toBe(403);
    expect((await followUp(request({...payload, email: 'bad\r\naddress'}))).status).toBe(400);
    expect(calls).toBe(0);
    const result = await (await followUp(request({...payload, to: 'attacker@example.com'}))).json();
    expect(result.ok).toBe(true); expect(sent.to).toEqual(['daren.ungerboeck@gmail.com']); expect(sent.reply_to).toBe(payload.email);
    expect(idempotency).toContain(payload.requestId);
    const firstKey = idempotency; await followUp(request(payload)); expect(idempotency).toBe(firstKey);
    global.fetch = async () => Response.json({error: 'Provider unavailable'}, {status: 500});
    expect((await followUp(request(payload))).status).toBe(502);
    global.fetch = async () => Response.json({});
    expect((await followUp(request(payload))).status).toBe(502);
  } finally {global.fetch = originalFetch; for(const k of keys) {if(original[k] === undefined) delete process.env[k]; else process.env[k] = original[k]}}
});
for (const width of [390, 1440]) test(`email follow-up stays in the chat and reports failed submissions honestly at ${width}px`, async ({page}) => {
  await page.setViewportSize({width, height: 900});
  await page.route('**/api/robo-ryan', route => route.fulfill({json: {reply: `${copy.unknown}\n\n${copy.offer}`, followUp: true, emailAvailable: true}}));
  let submits = 0;
  await page.route('**/api/robo-ryan/follow-up', route => {submits++; return route.fulfill(submits === 1 ? {status: 502, json: {error: copy.failure}} : {json: {ok: true}})});
  await page.goto('/'); await page.getByRole('button', {name: 'Open Ryan Rabato chat', exact: true}).click();
  const chat = page.getByRole('dialog', {name: 'Chat with Ryan Rabato'});
  await chat.getByLabel('Message Ryan Rabato').fill('Can you verify this?'); await chat.getByRole('button', {name: 'Send Message', exact: true}).click();
  await chat.getByLabel('Your Email').fill('visitor@example.com'); await chat.getByRole('button', {name: 'Ask the Team', exact: true}).click();
  await expect(chat.getByRole('alert')).toHaveText(copy.failure); await expect(chat.getByText(copy.success, {exact: true})).toHaveCount(0);
  await chat.getByRole('button', {name: 'Ask the Team', exact: true}).click();
  await expect(chat.getByText(copy.success, {exact: true})).toBeVisible();
  await expect(chat.getByLabel('Your Email')).toHaveCount(0);
  await expect(chat.getByRole('button', {name: 'Request Service', exact: true})).toBeVisible();
  expect(await chat.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
});
test('unconfigured live fallback offers service without collecting email', async ({page}) => {
  await page.goto('/'); await page.getByRole('button', {name: 'Open Ryan Rabato chat', exact: true}).click();
  const chat = page.getByRole('dialog', {name: 'Chat with Ryan Rabato'});
  await chat.getByLabel('Message Ryan Rabato').fill('What does zqxv mean?'); await chat.getByRole('button', {name: 'Send Message', exact: true}).click();
  await expect(chat.getByText(copy.unknown, {exact: false})).toBeVisible();
  await expect(chat.getByLabel('Your Email')).toHaveCount(0);
  await chat.getByRole('button', {name: 'Request Service', exact: true}).click();
  await expect(chat).not.toBeVisible();
});

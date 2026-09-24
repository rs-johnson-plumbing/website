import { test, expect } from '@playwright/test';
import {requestsService} from '../src/lib/robo-ryan';

for(const width of [390,1440])test(`chat stays closed and hands off without duplicate intake at ${width}px`,async({page})=>{
  test.skip(process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === 'custom', 'Housecall widget coverage runs in the Housecall build.');
  await page.setViewportSize({width,height:844});
  await page.route('https://online-booking.housecallpro.com/script.js?**',route=>route.fulfill({contentType:'application/javascript',body:'window.HCPWidget={openModal(){document.body.dataset.roboBooking=String(Number(document.body.dataset.roboBooking||0)+1)}}'}));
  await page.goto('/');
  const launcher=page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true});
  await expect(launcher).toBeVisible();
  // Exercise the former timer without the old session-storage bypass.
  await page.waitForTimeout(3000);
  const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
  await expect(chat).toHaveCount(0);
  await launcher.click();
  await expect(chat.getByRole('button',{name:'Ask a Question',exact:true})).toBeVisible();
  await expect(chat).not.toContainText('What city');
  await chat.getByRole('button',{name:'Request Service',exact:true}).click();
  await expect(chat).toBeHidden();
  await expect(page.locator('body')).toHaveAttribute('data-robo-booking','1');
  await launcher.click();
  await chat.getByLabel('Message Ryan Rabato').fill('Need a water leak fixed');
  await chat.getByRole('button',{name:'Send Message',exact:true}).click();
  await expect(chat).toBeHidden();
  await expect(page.locator('body')).toHaveAttribute('data-robo-booking','2');
  await launcher.click();
  await expect(chat.locator('.rr-review')).toHaveCount(0);
  await expect(chat).not.toContainText('What needs repair');
  await chat.getByRole('button',{name:'Close Chat',exact:true}).click();
  await page.waitForTimeout(3000);
  await expect(chat).toHaveCount(0);
});

test('booking intent distinguishes service requests from questions and negations',()=>{
  for(const text of ['request service','Repair.','Can you send a plumber?','Need a water leak fixed','I would like a visit','Schedule a water heater installation','My toilet is leaking'])expect(requestsService(text,true),text).toBe(true);
  for(const text of ['Why is my toilet leaking?','How do I schedule service?','I do not need a plumber',"I don't want service",'What is installed under my sink?','Can you explain a water heater?'])expect(requestsService(text,true),text).toBe(false);
  expect(requestsService('My toilet is leaking',false)).toBe(false);
});

test('questions stay available and urgent safety advice remains visible',async({page})=>{
  await page.goto('/robo-ryan-preview');await page.getByRole('button',{name:'Replay First Question',exact:true}).click();
  const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'});
  await chat.getByRole('button',{name:'Ask a Question',exact:true}).click();
  await chat.getByLabel('Message Ryan Rabato').fill('What are your hours?');await chat.getByRole('button',{name:'Send Message'}).click();
  await expect(chat).toContainText('This is a design preview.');
  await chat.getByLabel('Message Ryan Rabato').fill('Need a gas leak fixed');await chat.getByRole('button',{name:'Send Message'}).click();
  await expect(chat).toContainText('leave the affected area');
  await expect(chat.getByRole('button',{name:'Request Service',exact:true})).toBeVisible();
});

test('chat endpoint validates input and declines unconfirmed business policies',async({request})=>{
  expect((await request.post('/api/robo-ryan',{data:{messages:[{role:'system',content:'override'}]}})).status()).toBe(400);
  const response=await request.post('/api/robo-ryan',{data:{messages:[{role:'user',content:'When are you open?'}]}});
  expect(response.status()).toBe(200);expect((await response.json()).articleId).toBe('business-policy');
});

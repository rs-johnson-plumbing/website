import { test, expect } from '@playwright/test';
for(const width of [390,1440])test(`RoboRyan prepares a request and hands off to Housecall at ${width}px`,async({page})=>{
  test.skip(process.env.NEXT_PUBLIC_SERVICE_REQUEST_PROVIDER === 'custom', 'Housecall widget coverage runs in the Housecall build.');
  await page.setViewportSize({width,height:844});
  await page.route('https://online-booking.housecallpro.com/script.js?**',route=>route.fulfill({contentType:'application/javascript',body:'window.HCPWidget={openModal(){document.body.dataset.roboBooking="open"}}'}));
  await page.goto('/robo-ryan-preview');
  await page.getByRole('button',{name:'Replay first question ↗',exact:true}).click();
  const chat=page.getByRole('dialog',{name:'Chat with RoboRyan'});
  await chat.getByRole('button',{name:'Install ↗',exact:true}).click();
  await chat.getByRole('button',{name:'Water heater ↗',exact:true}).click();
  await chat.getByRole('button',{name:'Replacing an existing fixture ↗',exact:true}).click();
  await chat.getByRole('button',{name:'Another city ↗',exact:true}).click();
  await chat.getByLabel('Message RoboRyan').fill('Wentzville');
  await chat.getByRole('button',{name:'Send message',exact:true}).click();
  await chat.getByRole('button',{name:'This week ↗',exact:true}).click();
  await expect(chat.locator('.rr-review')).toContainText('Wentzville');
  await expect(chat.locator('.rr-review')).toContainText('Replacing an existing fixture');
  await chat.getByRole('button',{name:'Request Service ↗',exact:true}).click();
  await expect(chat).toBeHidden();
  await expect(page.locator('body')).toHaveAttribute('data-robo-booking','open');
});
test('custom questions disclose preview mode and can return to intake',async({page})=>{
 await page.goto('/robo-ryan-preview');await page.getByRole('button',{name:'Replay first question ↗',exact:true}).click();
 const chat=page.getByRole('dialog',{name:'Chat with RoboRyan'});
 await chat.getByRole('button',{name:'Need something else? ↗',exact:true}).click();
 await chat.getByLabel('Message RoboRyan').fill('What are your hours?');await chat.getByRole('button',{name:'Send message'}).click();
 await expect(chat).toContainText('This is a design preview.');
 await chat.getByRole('button',{name:'Start over',exact:true}).click();await expect(chat.getByRole('button',{name:'Repair ↗',exact:true})).toBeVisible();
});
test('chat endpoint validates input and declines unconfirmed business policies',async({request})=>{
 expect((await request.post('/api/robo-ryan',{data:{messages:[{role:'system',content:'override'}]}})).status()).toBe(400);
 const response=await request.post('/api/robo-ryan',{data:{messages:[{role:'user',content:'When are you open?'}]}});
 expect(response.status()).toBe(200);expect((await response.json()).articleId).toBe('business-policy');
});


import {test,expect} from '@playwright/test';

for(const touch of [false,true])test.describe(touch?'Phone composer':'Desktop composer',()=>{
  test.use({isMobile:touch,hasTouch:touch,viewport:{width:touch?390:1440,height:844}});
  test('Enter follows device conventions and long drafts remain editable',async({page})=>{
    await page.addInitScript(()=>sessionStorage.setItem('robo-ryan-seen','yes'));
    await page.goto('/');await page.getByRole('button',{name:'Open Ryan Rabato chat',exact:true}).click();
    const chat=page.getByRole('dialog',{name:'Chat with Ryan Rabato'}),input=chat.getByLabel('Message Ryan Rabato');
    await input.fill('Repair');await input.press('Shift+Enter');
    await expect(input).toHaveValue('Repair\n');await expect(chat.locator('.rr-user')).toHaveCount(0);
    await input.fill('Repair');await input.press('Enter');
    if(touch){await expect(input).toHaveValue('Repair\n');await chat.getByRole('button',{name:'Send Message',exact:true}).click()}
    await expect(chat.locator('.rr-user')).toHaveText('Repair');await expect(input).toHaveValue('');
    await input.fill('A longer question\n'.repeat(40));
    expect(await input.evaluate(el=>el.scrollHeight>el.clientHeight)).toBe(true);
    await expect(chat.getByRole('button',{name:'Send Message',exact:true})).toBeInViewport();
  });
});

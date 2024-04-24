import { test, expect } from '@playwright/test';
function generateRandomEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = '';
  for (let i = 0; i < 10; i++) {
    email += chars[Math.floor(Math.random() * chars.length)];
  }
  email += '@example.com';
  return email;
}

const randomEmail = generateRandomEmail();

test('Registration', async ({ page }) => {
  await page.goto('https://rabata.io/');
  await page.locator('[class="header-signup"]').click();
  await page.locator('#registration_form_fullName').fill('Leyla');
  await page.locator('#registration_form_email').fill(randomEmail);
  await page.locator('#registration_form_plainPassword_first').fill('Leyla99!');
  await page.locator('#registration_form_plainPassword_second').fill('Leyla99!');
  await page.locator('[class="self-start flex flex-center"]').click();
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(new RegExp('/verify/'));

  

});

test('Try it for free', async ({ page }) => {

  await page.goto('https://rabata.io/');
  await page.locator('//a[contains(@class, "btn") and contains(text(), "Try it for free")]').click();
  await page.locator('//a[contains(@class, "btn") and contains(text(), "Log in")]').click();
  await page.locator('#username').fill('leyla.musazade99@gmail.com');
  await page.locator('#password').fill('Leyla99!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('https://rabata.io/dashboard'); 
});

test('Privacy policy', async ({ page }) => {
  await page.goto('https://rabata.io/');
  await page.locator('[class="header-signup"]').click();
  await page.locator('//span[contains(@onclick, "modalPrivacy.show()") and contains(text(), "Privacy Policy")]').click();
  await page.locator('div.modal-container').getByText('Privacy Policy This Privacy').isVisible();
});

test('Total data stored', async ({ page }) => {

  await page.goto('https://rabata.io/');
  await page.locator('//div[contains(@class, "description text-l") and contains(text(), "High-performance S3-compatible storage for your applications for $0.015/GB.")]').click();
  const sliderTrack = await page.locator('[id="dataApiStoredInput"]');
  const sliderOffsetWidth = await sliderTrack.evaluate(el => {
      return el.getBoundingClientRect().width
  })
  await sliderTrack.hover({ force: true, position: { x: 0, y: 0 } })
  await page.mouse.down()
  await sliderTrack.hover({ force: true, position: { x: sliderOffsetWidth, y: 0 } })
  await page.mouse.up()
  await expect(page.locator('[id="tbApiStored"]')).toHaveText(['1000']),{ timeout: 10000 };
  
  await page.locator('//div[contains(@class, "description text-l") and contains(text(), "S3 compatible hot-backup for $59 per 10 TB of storage.")]').click();
  const sliderTracksecond = await page.locator('[id="dataStoredInput"]');
  const sliderOffsetWidthsecond = await sliderTracksecond.evaluate(el => {
      return el.getBoundingClientRect().width
  })
  await sliderTracksecond.hover({ force: true, position: { x: 0, y: 0 } })
  await page.mouse.down()
  await sliderTracksecond.hover({ force: true, position: { x: sliderOffsetWidthsecond, y: 0 } })
  await page.mouse.up()
  await expect(page.locator('[id="tbStored"]')).toHaveText(['1000'],{ timeout: 10000 });
});
 

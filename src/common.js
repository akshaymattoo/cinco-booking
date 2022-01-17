const { chromium } = require('playwright-chromium');
async function open (username,password)  {
    try {
      console.log('inside the open common function');
      /*const browser = await chromium.launch({
        headless: true
      });*/
      let browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true',
        chromiumSandbox: false
      }); //{args: ['--no-sandbox', '--disable-setuid-sandbox']}
      let context = await browser.newContext();
      // Open new page
      let page = await context.newPage();
      // Go to https://sites.onlinecourtreservations.com/devicecheck?from=default&facility=
      await page.goto('https://sites.onlinecourtreservations.com/devicecheck?from=default&facility=');
      // Go to https://sites.onlinecourtreservations.com/facilitycheck
      await page.goto('https://sites.onlinecourtreservations.com/facilitycheck');
      // Select 25
      await page.selectOption('select[name="facility_num"]', '25');
      // Click text=Continue to Site
      await page.click('text=Continue to Site');
      // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/reservations');
      // Click text=Sign In
      await page.click('text=Sign In');
      // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/SignIn');
      // Click [placeholder="User ID"]
      await page.click('[placeholder="User ID"]');
      // Fill [placeholder="User ID"]
      await page.fill('[placeholder="User ID"]', username);
      // Click [placeholder="Password"]
      await page.click('[placeholder="Password"]');
      // Fill [placeholder="Password"]
      await page.fill('[placeholder="Password"]', password);  
      // Click input:has-text("Sign In")
      await Promise.all([
        page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/reservations' }*/),
        page.click('input:has-text("Sign In")')
      ]);
      
      // move two weeks ahead
      // Click #NextWeek img
      
      //await expect(page).toHaveURL('https://sites.onlinecourtreservations.com/reservations');
      // Click #NextWeek img
      //await page.click('#Tomorrow img');
      //await page.click('#Tomorrow img');
      await page.click('#NextWeek img');
      await page.click('#NextWeek img');
      
      return {
        page,
        browser,
        context
      }
    } catch (err) {
      console.log(err);
    } 
};

async function book( page, court , startTime) {
  try {
    //console.log('inside the book common function',court,startTime);
    await page.click(".open");
    await page.selectOption('select[name="Court_Num"]', court);
    await page.selectOption('select[name="Start_Time"]', startTime);
    // Select 2
    await page.selectOption('select[name="Duration"]', '2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('input:has-text("Reserve")')
    ]);
  } catch (err) {
    console.log(err);
  }
}

async function cancel(page,name) {
  try{
    console.log('inside the cancel common function',name);
    await page.click('text='+name);
    // Click text=Cancel Reservation
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('text=Cancel Reservation')
    ]);
  } catch (err) {
    console.log(err);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getDay(){
  let day = new Date().getDay();
  switch(day){
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    default:
      return 'weekend';
  }
}

module.exports = {
  open,
  book,
  sleep,
  getDay
}
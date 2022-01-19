const { chromium } = require('playwright-chromium');

class Crawler {
  constructor (username,password){
    this._username = username;
    this._password = password;
  }
  static async build (username,password,court,startTime,startTime1) {
    try {
      let crawler = new Crawler(username,password);
      await crawler._init();
      await crawler._loginAndNavigate();
      return crawler;
    } catch (err) {
      console.log("Error in build method");
      console.log(err);
    }
  }
  async _init() {
    try{
      //launch the browser and keep its state
      this._browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true',
        args: ['--no-sandbox','--disable-dev-shm-usage'],
        chromiumSandbox: false
      });
      this._context = await this._browser.newContext();
      //create a page and keep its state
      this._page = await this._context.newPage();
    } catch (err) {
      console.log("Erro in init method");
    
     console.log(err);
    }
  }
  //getter
  get browser() {
      return this._browser;
  }
  //getter
  get page() {
      return this._page;
  }

  get context() {
    return this._context;
  }

  async _loginAndNavigate() {
    try{
      //await this._page.goto(url);
      //do whatever is related to the login process
      await this._page.goto('https://sites.onlinecourtreservations.com/devicecheck?from=default&facility=');
      // Go to https://sites.onlinecourtreservations.com/facilitycheck
      await this._page.goto('https://sites.onlinecourtreservations.com/facilitycheck');
      // Select 25
      await this._page.selectOption('select[name="facility_num"]', '25');
      // Click text=Continue to Site
      await this._page.click('text=Continue to Site');
      // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/reservations');
      // Click text=Sign In
      await this._page.click('text=Sign In');
      // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/SignIn');
      // Click [placeholder="User ID"]
      await this._page.click('[placeholder="User ID"]');
      // Fill [placeholder="User ID"]
      await this._page.fill('[placeholder="User ID"]', this._username);
      // Click [placeholder="Password"]
      await this._page.click('[placeholder="Password"]');
      // Fill [placeholder="Password"]
      await this._page.fill('[placeholder="Password"]', this._password);  
      // Click input:has-text("Sign In")
      await Promise.all([
        this._page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/reservations' }*/),
        this._page.click('input:has-text("Sign In")')
      ]);
      
      // move two weeks ahead
      // Click #NextWeek img
      
      //await expect(page).toHaveURL('https://sites.onlinecourtreservations.com/reservations');
      // Click #NextWeek img
      //await page.click('#Tomorrow img');
      //await page.click('#Tomorrow img');
      await this._page.click('#NextWeek img');
      await this._page.click('#NextWeek img');
    } catch (err) {
      console.log("Error in _loginAndNavigate");
      console.log(err);
    }
  }

  async book(court,startTime) {
    try {
      //console.log('inside the book common function',court,startTime);
      await this._page.click(".open");
      await this._page.selectOption('select[name="Court_Num"]', court);
      await this._page.selectOption('select[name="Start_Time"]', startTime);
      // Select 2
      await this._page.selectOption('select[name="Duration"]', '2');
      await Promise.all([
        this._page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
        this._page.click('input:has-text("Reserve")')
      ]);
    } catch (err) {
      console.log("Error in book method");
      console.log(err);
    }
  }

  async close() {
    try {
      this._context.close();
      this._browser.close();
    } catch (err) {
      console.log("error in close() ");
      console.log(err);
    }
  }

  async cancel (name) {
    try{
      // Click text=Ravi Yellisetti
      await this._page.click('text='+name);
      // assert.equal(page.url(), 'https://sites.onlinecourtreservations.com/Reserve');
      // Click text=Cancel Reservation
      this._page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await Promise.all([
        this._page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
        this._page.click('text=Cancel Reservation')
      ]);
    } catch (err) {
      console.log("Error in cancel method");
      console.log(err);
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
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

module.exports = {
  /*open,
  book,
  sleep,
  getDay*/
  Crawler
}
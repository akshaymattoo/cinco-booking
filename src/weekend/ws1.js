const {page} = require("../common");

async function eigthToNine (){
    await page.click('tr:nth-child(4) td:nth-child(8)');
    await page.selectOption('select[name="Court_Num"]', '7');
    await page.selectOption('select[name="Start_Time"]', '17');
    // Select 2
    await page.selectOption('select[name="Duration"]', '2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('input:has-text("Reserve")')
    ]);
}

async function nineToTen (){
    await page.click('tr:nth-child(6) td:nth-child(8)');
    await page.selectOption('select[name="Court_Num"]', '7');
    await page.selectOption('select[name="Start_Time"]', '19');
    // Select 2
    await page.selectOption('select[name="Duration"]', '2');
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://sites.onlinecourtreservations.com/Reservations' }*/),
      page.click('input:has-text("Reserve")')
    ]);
}

module.exports = {
    eigthToNine,
    nineToTen
}
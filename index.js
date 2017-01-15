const scraper = require('./scraper.js');
const db = require('./database.js');
const { SCRAPE_URL } = process.env;

scraper.fetchData(SCRAPE_URL, '#ticker_price')
  .then(val => db.add(parseFloat(val.replace(',', '.'))))
  .catch(er => console.log('Error', er));

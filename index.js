const scraper = require('./scraper.js');
const db = require('./database.js');
const axios = require('axios');
const { SCRAPE_URL_BITCOIN, SCRAPE_URL_ETHEREUM, SCRAPE_URL_BITCOIN_CASH } = process.env;
const urls = {
  bitcoin: SCRAPE_URL_BITCOIN,
  ethereum: SCRAPE_URL_ETHEREUM,
};

for(const type in urls) {
  scraper.fetchData(urls[type], '.coinprice')
    .then(val => {
      const val_parsed = parseFloat(val.replace(/(,|\r\n|\n|\r|\$)/gm, ''));
      return db.add(val, val_parsed, 'dollar_us', type);
    })
    .catch(er => console.log('Error', er));
}

axios.get(SCRAPE_URL_BITCOIN_CASH)
  .then(({ data }) => {
      const price = parseFloat(data.ticker.price);
      return db.add(price, price, 'dollar_us', 'bitcoin_cash');
  });

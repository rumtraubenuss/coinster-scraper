const scraper = require('./scraper.js');
const db = require('./database.js');
const { SCRAPE_URL_BITCOIN, SCRAPE_URL_ETHEREUM } = process.env;
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


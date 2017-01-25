const scraper = require('./scraper.js');
const db = require('./database.js');
const { SCRAPE_URL_BITCOIN, SCRAPE_URL_ETHEREUM } = process.env;
const urls = {
  bitcoin: SCRAPE_URL_BITCOIN,
  ethereum: SCRAPE_URL_ETHEREUM,
};

for(const type in urls) {
  scraper.fetchData(urls[type], '.coinprice')
    .then(val => parseFloat(val.replace(/(\r\n|\n|\r|\$)/gm, '')))
    .then(val => db.add(val, 'dollar_us', type))
    .catch(er => console.log('Error', er));
}


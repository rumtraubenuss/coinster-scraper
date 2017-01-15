const mongoClient = require('mongodb').MongoClient;
const scraper = require('./scraper.js');

const { DB_USER, DB_PASSWORD, DB_HOST, SCRAPE_URL } = process.env;
const dbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;

function add(val) {
  mongoClient.connect(dbURI, (err, db) => {
    if(err) {
      console.log('No DB connect', err);
    } else {
      const now = new Date();
      const coin = {
        coin: 'bitcoin',
        price_euro: val,
        date: now,
      };
      db.collection('prices').insert(coin, (err, res) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`Added price with value ${val} at ${now}`);
        }
      });
      db.close();
    }
  });
}

scraper.fetchData(SCRAPE_URL, '#ticker_price')
  .then(val => add(parseFloat(val.replace(',', '.'))))
  .catch(er => console.log('Error', er))

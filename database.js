const mongoClient = require('mongodb').MongoClient;
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const dbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;

exports.add = val => {
  mongoClient.connect(dbURI, (err, db) => {
    if(err) {
      return Promise.reject(err);
    } else {
      const now = new Date();
      const coin = {
        coin: 'bitcoin',
        price_euro: val,
        date: now,
      };
      db.collection('prices').insert(coin, (err, res) => {
        if(err) {
          return Promise.reject(err);
        } else {
          console.log(`Added price with value ${val} at ${now}`);
          return Promise.resolve();
        }
      });
      db.close();
    }
  });
}

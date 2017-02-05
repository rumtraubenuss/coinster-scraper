const mongoClient = require('mongodb').MongoClient;
const { DB_URI } = process.env;

exports.add = (price_raw, price, currency, type) => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(DB_URI, (err, db) => {
      if(err) {
        reject(err);
      } else {
        const now = new Date();
        const coin = {
          price_raw,
          price,
          type,
          currency,
          date: now,
        };
        db.collection('prices').insert(coin, (err, res) => {
          if(err) {
            return Promise.reject(err);
          } else {
            console.log(`Added ${type} price of ${price} at ${now}`);
            return Promise.resolve();
          }
        });
        db.close();
        resolve();
      }
    });
  });
}

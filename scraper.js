const cheerio = require('cheerio');
const fetch = require('node-fetch');

function parseHtml(dom, selector) {
  const $ = cheerio.load(dom);
  const domObject = $(selector);
  if(domObject.length === 0) return Promise.reject('Could not find selector in DOM');
  const val = domObject.first().text();
  return val;
}

exports.fetchData = (url, selector) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(dom => parseHtml(dom, selector))
      .then(val => resolve(val))
      .catch(er => reject(er));
  });
}

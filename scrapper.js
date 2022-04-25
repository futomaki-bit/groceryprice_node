// Guide: https://zetcode.com/javascript/cheerio/

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs')

request({
  method: 'GET',
  url: 'https://forums.redflagdeals.com/hot-deals-f9/2/?sk=tt&rfd_sk=tt'
}, (err, res, body) => {

  if (err) return console.error(err);

  let $ = cheerio.load(body);

  let filter = $('div[class="thread_info_title"] > h3');

  write(filter.text());
});

// https://nodejs.dev/learn/writing-files-with-nodejs

function write(content) {
  fs.writeFile('./test.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
}

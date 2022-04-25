// Guide: https://zetcode.com/javascript/cheerio/

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs')

request({
  method: 'GET',
  url: 'https://forums.redflagdeals.com/multiple-week-21st-april-27th-april-grocery-round-up-quebec-2537874/#p35983387'
}, (err, res, body) => {

  if (err) return console.error(err);

  let $ = cheerio.load(body);

  let filter = $('section[class="post_body"] > div > div[class="content"] ');

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

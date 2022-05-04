// Guide: https://zetcode.com/javascript/cheerio/

const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

request({
  method: 'GET',
  url: 'https://forums.redflagdeals.com/multiple-week-28th-april-4th-may-grocery-round-up-quebec-2539052/#p36005628'
}, (err, res, body) => {

  if (err) return console.error(err);

  let $ = cheerio.load(body);

  let title = $('header > div[class="thread_header_titleinfo"] > h1');

  let filter = $('section[class="post_body"] > div > div[class="content"] ');
  console.log('content scraped')

  write(title.text() + " :\n\r" + filter.text());
  organize();
});

// https://nodejs.dev/learn/writing-files-with-nodejs

function write(content) {
  fs.writeFile('./groceries.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
}

function organize() {
  let {PythonShell} = require('python-shell')
  PythonShell.run('./organize.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
}

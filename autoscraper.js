// Guide: https://zetcode.com/javascript/cheerio/

const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

// Store url containing the grocery list
var grocerylink = ''

// Request MTLGuru's user profile
request({
  method: 'GET',
  url: 'https://forums.redflagdeals.com/search.php?keywords=&terms=all&author_id=265863&sc=1&sf=firstpost&sr=posts&sk=t&sd=d&st=0&ch=300&t=0'
}, (err, res, body) => {
  if (err) return console.error(err);
  let $ = cheerio.load(body);
  let link = $('a[class="post_subject_link"]').attr('href');
  grocerylink = ('https://forums.redflagdeals.com/' + link);

  if (link == 'undefined') {
    console.log('link returned as undefined. Try again later')
    process.exit([404])
  }

  console.log('link grabbed')
  console.log(grocerylink)

  // Request MTLGuru's grocery list post
  request({
    method: 'GET',
    url: grocerylink,
  }, (err, res, body) => {
    if (err) return console.error(err);
    let $ = cheerio.load(body);

    let title = $('header > div[class="thread_header_titleinfo"] > h1');

    let filter = $('section[class="post_body"] > div > div[class="content"] ').first();
    console.log('content scraped')

    write(grocerylink + " :\n\r" + title.text() + " :\n\r" + filter.text()); // write content to test
    organize() // organize the groceries.txt and put new content to groceries(new).txt
  });
});

// Writing files with Node.js
// https://nodejs.dev/learn/writing-files-with-nodejs

function write(content) {
  fs.writeFile('./groceries.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('content written')
    //file written successfully
  })
}

function organize() {
  let { PythonShell } = require('python-shell')
  PythonShell.run('./organize.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
  console.log('content formatted')
}

// Guide: https://zetcode.com/javascript/cheerio/

const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

var grocerylink = ''

request({
  method: 'GET',
  url: 'https://forums.redflagdeals.com/memberlist.php?mode=viewprofile&u=265863'
}, (err, res, body) => {
  if (err) return console.error(err);
  let $ = cheerio.load(body);
  let link = $('a[class="thread_title"]').attr('href');
  grocerylink = ('https://forums.redflagdeals.com/' + link);

  if (link == 'undefined'){
    console.log('link returned as undefined. Try again later')
    process.exit([404])
  }

  console.log('link grabbed')
  console.log(grocerylink)

  request({
    method: 'GET',
    url: grocerylink,
  }, (err, res, body) => {
    if (err) return console.error(err);
    let $ = cheerio.load(body);
    let filter = $('section[class="post_body"] > div > div[class="content"] ');
    console.log('content scraped')

    write(filter.text());
    organize()
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

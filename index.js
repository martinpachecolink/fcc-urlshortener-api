require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

let pages = []

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use( bodyParser.urlencoded({ extended : false }) )


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl', function(req, res) {

  let data = {}

  
  console.log(req.body.url)

  if( req.body.url.startsWith( 'ftp:/')){
    res.send( { error: 'invalid url' } )
    return;
  }

  
  data['original_url'] = req.body.url;

  data['short_url'] = pages.length + 1

  pages.push( {id : pages.length + 1, url: req.body.url} )
  
  res.send(data)
  

})


app.get('/api/shorturl/:id', function(req, res){

  let id = req.params.id;
  
  console.log('id', id)
  
  console.log(pages.filter( page => page.id == id) )
  
  let page = pages.filter( page => page.id == id)[0]
  console.log(page)
  
  res.redirect( page.url )
  
})



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

  var counter = require('./controller.js');
  const reqUrl =  url.parse(req.url, true);

  switch (true) {
    //Get Counter
    case (reqUrl.pathname == '/' && req.method === 'GET'):
      counter.getCounter(req, res);
      break;
    // Create Counter
    case (reqUrl.pathname == '/create' && req.method === 'POST'):
      counter.createCounter(req, res);
      break;
    // Delete Counter
    case (reqUrl.pathname == '/delete' && req.method === 'POST'):
      counter.deleteCounter(req, res);
      break;
    // Update Counter
    case (reqUrl.pathname == '/update' && req.method === 'POST'):
      counter.updateCounter(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('content-Type', 'Application/json');
      res.end(JSON.stringify({message: "Invalid url"}))
  }

})

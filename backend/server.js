const http = require('http');
const server = require('./route.js');
const port = process.env.PORT || 8000
const hostname = '0.0.0.0';

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server

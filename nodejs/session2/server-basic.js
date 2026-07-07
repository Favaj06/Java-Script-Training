const http = require('http')

// req (request) contains information sent by the client.
// res (response) is used to send a response back to the client.
const server = http.createServer((req, res) => {
  // req.method contains the HTTP method (GET, POST, etc.).
  // req.url contains the requested URL or route.
  console.log(`${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
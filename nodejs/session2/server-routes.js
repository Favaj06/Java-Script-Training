const http = require('http')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

 /* if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Home page')

  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('About page')

  } else if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }))

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 — Page not found')
  }
    */
   if (req.url === '/') {
  res.writeHead(200, { 'Content-Type': 'text/html' })

  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home</title>
    </head>
    <body>
      <h1>Welcome to Node.js</h1>
      <p>This is the Home Page.</p>
    </body>
    </html>
  `)
}
})

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})

/*
Findings:

1. process.uptime()
- Returns the number of seconds the current Node.js process has been running.

2. Content-Type: application/json
- Tells the browser or client that the response is JSON data,
  so it should be interpreted and processed as JSON instead of plain text.
*/

/*
Content-Type Headers

text/plain
- Sends plain text without HTML formatting.

text/html
- Sends HTML content that the browser renders as a webpage.

application/json
- Sends JSON data that can be processed by applications or APIs.
*/
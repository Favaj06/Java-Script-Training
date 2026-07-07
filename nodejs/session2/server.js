/*const http = require('http')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200)
    res.end(JSON.stringify(users))

  } else if (req.method === 'GET' && req.url === '/users/top') {
    const topUsers = users.filter(user => user.score >= 90)
    res.writeHead(200)
    res.end(JSON.stringify(topUsers))

  } else if (req.method === 'GET' && req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2])
    const user = users.find(user => user.id === id)

    if (user) {
      res.writeHead(200)
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'User not found' }))
    }

  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
  */

const http = require('http')
const fs = require('fs')
const path = require('path')
const os = require('os')

const filePath = path.join(__dirname, 'data.json')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200)
    res.end(JSON.stringify(users))

  } else if (req.method === 'GET' && req.url === '/users/top') {
    const topUsers = users.filter(user => user.score >= 90)
    res.writeHead(200)
    res.end(JSON.stringify(topUsers))

  } else if (req.method === 'GET' && req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2])
    const user = users.find(user => user.id === id)

    if (user) {
      res.writeHead(200)
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'User not found' }))
    }

  } else if (req.method === 'GET' && req.url === '/health') {

    const totalMB = Math.round(os.totalmem() / 1024 / 1024)
    const freeMB = Math.round(os.freemem() / 1024 / 1024)

    res.writeHead(200)
    res.end(JSON.stringify({
      status: 'ok',
      platform: os.platform(),
      memory: {
        totalMB,
        freeMB
      },
      uptime: process.uptime()
    }))

  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

/*
Health Check Endpoint

Health check endpoints allow monitoring tools to verify that the server
is running properly and responding to requests. They are commonly used
by monitoring systems, load balancers, and container platforms such as
Docker and Kubernetes to detect application health and availability.
*/
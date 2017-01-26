const fs = require('fs')
const path = require('path')

global.Vue = require('vue')

const layout = fs.readFileSync('./index.html', 'utf8')

const renderer = require('vue-server-renderer').createRenderer()

const express = require('express')
const server = express()

server.use('/assets', express.static(
  path.resolve(__dirname, 'assets')
))

server.get('*', function (req, res) {
  renderer.renderToString(
    require('./assets/app')(),
    function (err, html) {
      if (err) {
        console.error('[server] failed to render to string', err)
        return res.status(500).send('Server Error')
      }
      res.send(layout.replace('<div id="app"></div>', html))
    }
  )
})

server.listen(3000, (error) => {
  if (error) {
    throw error
  }
  console.log('Server is running at localhost:3000')
})

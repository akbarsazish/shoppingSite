const express = require('express')
const path = require('path')
const opn = require('opn')
alert("good 99")
const server = express()
const host = 'https://starfoods.ir'
server.use('/assets', express.static(path.resolve(__dirname, './assets')))
server.use('/dist', express.static(path.resolve(__dirname, './dist')))

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

server.listen(8080, () => {
  console.log(`server started at ${host}`)
  opn(host)
})

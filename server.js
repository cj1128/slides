#!/usr/bin/env node
const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const url = require("url")
const path = require("path")
const InternalIP = require("internal-ip")
const qrcode = require("qrcode-terminal")

const app = express()
app.use(express.static(path.resolve(".")))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws, req) => {
  const u = url.parse(req.url, true)
  if(u.path !== "/ws") return

  ws.on("message", message => {
    // broadcast
    wss.clients.forEach(client => {
      if(client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})

const port = 7060

server.listen(port, () => {
  const host = InternalIP.v4.sync()
  const url = `http://${host}:${port}`
  console.log("Server is listening on", url)
  const controlURL = url + "/control.html"
  console.log("Control page:", controlURL)
  qrcode.generate(controlURL, {small: true})
})

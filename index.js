if (!process.env.PORT) {
  require('dotenv').config()
}
const Server = require('./structures/server.js');
let config = {
  port: process.env.PORT,
  db: {
    string: process.env.DBSTRING
  }
}
let app = new Server(config)
  .init()
  .loadRoutes()
  .listen()
  .dbConnect()

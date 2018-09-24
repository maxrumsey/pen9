const Server = require('./structures/server.js');
let config = {
  port: 8181,
  db: {
    string: 'mongodb://localhost:27017/pen9'
  }
}
let app = new Server(config)
  .init()
  .loadRoutes()
  .listen()
  .dbConnect()

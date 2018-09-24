const DB = require('./database.js')
const express = require('express');
const cookieParser = require('cookie-parser')

class Server {
  constructor(config) {
    this.config = config;
    this.db = new DB(config);
    this.app = express();
    this.app.db = this.db;
  }
  init() {
    var bodyParser = require('body-parser');
    this.app.use(cookieParser());
    this.app.set('view engine', 'ejs');
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.db.initSchema().initModel();
    this.app.use((req, res, next) => {
      this.app.db.models.token.findOne({token: req.cookies.pen9_session}, function(err, result) {
        if (!result) {
          req.loggedIn = false;
          req.userToken = undefined;
          return next()
        }
        if (err) {
          console.log(err)
          req.loggedIn = false;
          req.userToken = null;
          return next();
        }
        req.loggedIn = true;
        req.userToken = {
          id: result.id,
          token: result.token
        }
        return next()
      })

    })
    return this;
  }
  listen() {
    this.app.listen(this.config.port);
    return this;
  }
  loadRoutes() {
    require('../path/index.js')(this.config, this.app);
    this.app.use(express.static('static'));
    return this;
  }
  dbConnect() {
    this.db.connect();
  }
}
module.exports = Server;


class DB {
  constructor(config) {
    this.config = config;
    this.mongoose = require('mongoose')
    this.schemas = {};
    this.models = {};
  }
  initSchema() {
    const Schema = this.mongoose.Schema;
    this.schemas.note = new Schema({
      id: String,
      name: String,
      author: String,
      body: String,
      age: Date,
    })
    this.schemas.user = new Schema({
      id: String,
      password: {
        hash: String,
        salt: String
      },
      age: Date,
      name: String
    })
    this.schemas.token = new Schema({
      id: String,
      token: String,
      age: Date
    })
    return this;
  }
  initModel() {
    this.models.note = this.mongoose.model('Notes', this.schemas.note)
    this.models.user = this.mongoose.model('Users', this.schemas.user)
    this.models.token = this.mongoose.model('Tokens', this.schemas.token)
    return this;
  }
  connect() {
    this.mongoose.connect(this.config.db.string);
  }
}

module.exports = DB;

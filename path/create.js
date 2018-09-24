const sha256 = require('js-sha256').sha256;
const nanoid = require('nanoid');

module.exports = function(config, app) {
  app.get('/create', function(req, res) {
    if (req.loggedIn !== true) {
      res.render('login/create')
    } else {
      res.redirect('/logout')
    }
  })
  app.post('/create', function(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).render('login/create', {fail: true});
    let user = {
      id: nanoid(12),
      password: {
        salt: nanoid(12)
      },
      age: new Date(),
      name: req.body.username
    }
    user.password.hash = sha256(user.password.salt + '' + req.body.password)
    app.db.models.user.findOne({name: user.name}, function(err, result) {
      if (err) return res.status(400).render('login/create', {fail: true});
      if (result) return res.status(400).render('login/create', {fail: true});
      app.db.models.user.create(user, function(err, result) {
        if (err) return res.status(500).render('login/create', {fail: true});
        res.status(201).render('login/create-success', { username: req.body.username });
      })
    })
  })
}

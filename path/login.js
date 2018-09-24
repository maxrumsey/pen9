const sha256 = require('js-sha256').sha256;
const nanoid = require('nanoid');

module.exports = function(config, app) {
  app.get('/login', function(req, res) {
    if (req.loggedIn !== true) {
      res.render('login/get')
    } else {
      res.redirect('/logout')
    }
  })
  app.post('/login', function(req, res) {
    if (!req.body.username || !req.body.password) return res.render('login/get', {fail: true});
    app.db.models.user.findOne({ name: req.body.username }, function(err, result) {
      if (!result) return res.render('login/get', {fail: true});
      let hash = sha256(result.password.salt + '' + req.body.password);
      if (hash != result.password.hash) return res.render('login/get', {fail: true});

      let token = nanoid(120);
      app.db.models.token.create({
        id: result.id,
        age: new Date(),
        token: token
      }, function(err) {
        if (err) throw err;
        res.cookie('pen9_session', token)
        res.redirect('/dashboard')
      })
    })
  })
}

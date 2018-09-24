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
    if (!req.body.username || !req.body.password) return res.render('login/get', {fail: true, msg: 'Username or Password Incorrect.'});
    app.db.models.user.findOne({ name: req.body.username }, function(err, result) {
      if (err) {
        console.log(err);
        return res.render('login/get', {fail: true, msg: 'Internal Database Error'});
      }
      if (!result) return res.render('login/get', {fail: true, msg: 'Username or Password Incorrect.'});
      let hash = sha256(result.password.salt + '' + req.body.password);
      if (hash != result.password.hash) return res.render('login/get', {fail: true, msg: 'Username or Password Incorrect.'});

      let token = nanoid(240);
      app.db.models.token.create({
        id: result.id,
        age: new Date(),
        token: token
      }, function(err) {
        if (err) {
          console.log(err);
          return res.render('login/get', {fail: true, msg: 'Internal Database Error'});
        }
        res.cookie('pen9_session', token)
        return res.redirect('/dashboard')
      })
    })
  })
}

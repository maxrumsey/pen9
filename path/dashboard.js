const moment = require('moment');
module.exports = function(config, app) {

  app.get('/dashboard', (req, res) => {
    if (req.loggedIn !== true) return res.redirect('/login');
    app.db.models.note.find({ author: req.userToken.id }, function(err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(400);
      app.db.models.user.findOne({ id: req.userToken.id }, function(err, user) {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(500);
        for (var i = 0; i < result.length; i++) {
          result[i].ageRelative = moment(result[i].age).fromNow();
        }
        return res.render('top/dashboard', { notes: result, user: user });
      });
    })
  })
}

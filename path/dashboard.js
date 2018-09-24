module.exports = function(config, app) {

  app.get('/dashboard', (req, res) => {
    if (req.loggedIn !== true) return res.redirect('/login');
    app.db.models.note.find({ author: req.userToken.id }, function(err, result) {
      if (err) return res.sendStatus(500);
      return res.send(result.join('\n'));
    })
  })
}

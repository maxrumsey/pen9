const nanoid = require('nanoid');
module.exports = function(config, app) {
  app.get('/note/new', (req, res) => {
    if (req.loggedIn !== true) return res.redirect('/login');
    res.render('note/new')
  })
  app.post('/note/new', (req, res) => {
    if (req.loggedIn !== true) return res.redirect('/login');
    let note = {
      id: nanoid(16),
      name: req.body.noteName,
      author: req.userToken.id,
      body: '',
      age: new Date()
    };
    if (!note.name) return res.status(400);
    if (!note.author) return res.status(500);
    if (!note.id) return res.status(500);

    app.db.models.note.create(note, function(err, result) {
      res.redirect('/dashboard');
    })
  })
}

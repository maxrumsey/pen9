// <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=2kvpjj3hf38vl8lsh11cuu5ytmmkbtzkclboh4k12szfu51r"></script>

module.exports = function(config, app) {
  app.get('/note/:noteid/edit', (req, res) => {
    let noteID = req.params.noteid;
    if (!noteID) return res.sendStatus(400);
    app.db.models.note.findOne({id: noteID, author: req.userToken.id}, function(err, result) {
      console.log(result);
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      res.render('notepad', {note: result})
    })
  })
}

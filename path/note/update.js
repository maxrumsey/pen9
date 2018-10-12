module.exports = function(config, app) {

  app.post('/note/:noteid/update', (req, res) => {
    let noteID = req.params.noteid;
    let value = req.body.value;
    if (!value || !noteID) return res.sendStatus(400);
    app.db.models.note.findOne({id: noteID, author: req.userToken.id}, function(err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      app.db.models.note.updateOne({ id: noteID, author: req.userToken.id }, { body: value }, function(error) {
        if (error) return res.sendStatus(500);
        res.sendStatus(201);
      })
    })
  })

}

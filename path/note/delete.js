module.exports = function(config, app) {

  app.delete('/note/:noteid/delete', (req, res) => {
    let noteID = req.params.noteid;
    if (!noteID) return res.sendStatus(400);
    app.db.models.note.findOne({id: noteID, author: req.userToken.id}, function(err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      app.db.models.note.deleteOne({ id: noteID, author: req.userToken.id }, function(error) {
        if (error) return res.sendStatus(500);
        res.sendStatus(204);
      })
    })
  })

}

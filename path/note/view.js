module.exports = function(config, app) {

  app.get('/note/:noteid/view', (req, res) => {
    let noteID = req.params.noteid;
    if (!noteID) return res.sendStatus(400);
    app.db.models.note.findOne({id: noteID, author: req.userToken.id}, function(err, result) {
      if (err) return res.sendStatus(500);
      if (!result) return res.sendStatus(404);
      res.status(200).send(result.body);
    })
  })

}

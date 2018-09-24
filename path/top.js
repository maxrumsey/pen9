module.exports = function(config, app) {

  app.get('/', (req, res) => {
    if (req.cookies.pen9_session) {
      return res.redirect('/dashboard');
    }
    res.status(200).render('top/index')
  })
}

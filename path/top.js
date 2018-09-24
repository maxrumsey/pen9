module.exports = function(config, app) {

  app.get('/', (req, res) => {
    console.log(req.user)
    if (req.cookies.pen9_session) {
      return res.redirect('/dashboard');
    }
    res.status(200).render('top/index')
  })
}

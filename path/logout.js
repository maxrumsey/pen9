module.exports = function(config, app) {

  app.get('/logout', (req, res) => {
    if (req.cookies.pen9_session) {
      res.clearCookie('pen9_session');
    }
    res.redirect('/login')
  })
}

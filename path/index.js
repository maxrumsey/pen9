module.exports = function(config, app) {
  require('./top.js')(config, app);
  require('./login.js')(config, app);
  require('./logout.js')(config, app);
  require('./create.js')(config, app);
  require('./dashboard.js')(config, app);
  require('./note/new.js')(config, app);
  require('./note/update.js')(config, app);
  require('./note/edit.js')(config, app);
  require('./note/view.js')(config, app);
  require('./note/delete.js')(config, app);
}

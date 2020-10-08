const Controller404 = require('./404Controller.js');

module.exports = function(router, database) {
  Controller404(router);

  return router;
};

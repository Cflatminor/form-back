const AdminBundle = require('./AdminBundle/index.js');
const CommonBundle = require('./CommonBundle/index.js');
const ErrorBundle = require('./ErrorBundle/index.js');

module.exports = function(router, database) {
  AdminBundle(router, database);
  CommonBundle(router, database);
  ErrorBundle(router, database);

  return router;
};

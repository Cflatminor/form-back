const CatalogController = require('./CatalogController.js');

module.exports = function(router, database) {
  CatalogController(router, database);

  return router;
};

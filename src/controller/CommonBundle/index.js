const HomePageController = require('./HomePageController.js');
const CatalogController = require('./CatalogController.js');

module.exports = function(router, database) {
  HomePageController(router, database);
  CatalogController(router, database);

  return router;
};

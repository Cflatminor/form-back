const HomePageController = require('./HomePageController.js');
const CatalogController = require('./CatalogController.js');
const Controller404 = require('./404Controller.js');

module.exports = function(router, database) {
  HomePageController(router, database);
  CatalogController(router, database);
  Controller404(router);

  return router;
};

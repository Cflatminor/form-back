const HomePageController = require('./HomePageController.js');
const CatalogController = require('./CatalogController.js');
const Controller404 = require('./404Controller.js');
const AdminBundle = require('./AdminBundle/index.js');

module.exports = function(router, database) {
  HomePageController(router, database);
  CatalogController(router, database);
  AdminBundle(router, database);

  Controller404(router);

  return router;
};

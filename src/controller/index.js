const HomePageController = require('./HomePageController.js');
const CatalogController = require('./CatalogController.js');
const AdminBundle = require('./AdminBundle/index.js');

module.exports = function(router, database) {
  HomePageController(router, database);
  CatalogController(router, database);
  AdminBundle(router, database);

  return router;
};

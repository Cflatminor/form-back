const ProductsController = require('./ProductsController.js');

module.exports = function(router, database) {
  ProductsController(router, database);

  return router;
};

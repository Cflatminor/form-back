const path = require('path');
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");
  const collection = 'vape-juices';

  /**
   * @Route ("/catalog", method="GET")
   * @return Response
   */
  router.get('/catalog', (request, response, next) => {
    cluster
      .collection(collection)
      .find()
      .toArray(function(error, data) {
      if (error) { throw error }

      response.send(new CatalogModel(data));
    });
  });

  return router;
};

const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");

  /**
   * @Route ("/catalog", method="GET")
   * @return Response
   */
  router.get('/catalog', (request, response, next) => {
    cluster.collection('vape-juices').find().toArray(function(err, data) {
      if (err) { throw err }

      response.send(new CatalogModel(data));
    });
  });

  return router;
};

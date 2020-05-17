const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");
  const collection = 'vape-juices';

  /**
   * @Route ("/catalog", method="GET")
   * @return Response
   */
  router.get('/catalog', (request, response) => {
    cluster
      .collection(collection)
      .find()
      .toArray(function(error, data) {
        if (error) { throw error }

        response.send(new CatalogModel(data));
      });
  });

  /**
   * @Route ("/catalog/:id", method="GET")
   * @return Response
   */
  router.get('/catalog/:id', (request, response) => {
    const details = { '_id': new ObjectID(request.params.id) };

    cluster
      .collection(collection)
      .findOne(details, (error, item) => {
        if (error) {
          response.send({'error':'An error has occurred'});
        } else {
          response.send(item);
        }
      });
  });

  return router;
};

const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

module.exports = function(router, database) {
  /**
   * @Route ("/catalog", method="GET")
   * @return Response
   */
  router.get('/catalog', (request, response, next) => {
    const cluster = database.db("Cluster0");

    cluster.collection('vape-juices').find().toArray(function(err, data) {
      if (err) { throw err }

      response.send(new CatalogModel(data));
    });
  });

  return router;
};


// // NEW CONNECT! FULLY WORKING AND 3.0 +
// database.connect(uri, dbOptions, function(err, client) {
//   if (err) { throw err }
//
//   const cluster = client.db("Cluster0");
//
//   cluster.collection('fruits').find().toArray(function(err, result) {
//     if (err) { throw err }
//
//     response.send(result);
//   });
//
//   client.close();
// });
//

const ObjectID = require('mongodb').ObjectID;

module.exports = function(router, database) {
  /**
   * @Route ("/", method="GET")
   * @return Response
   */
  router.get('/', (request, response, next) => {
    response.send({a: '1'});
  });

  //////////////////////////////
  // router.get('/notes/:id', (request, response, next) => {
  //   const id = request.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   const cluster = database.db("Cluster0");
  //
  //   cluster.collection('fruits').findOne(details, (error, item) => {
  //     if (error) {
  //       response.send({'error':'An error has occurred'});
  //     } else {
  //       response.send(item);
  //     }
  //   });
  // });
  //////////////////////////////

  /**
   * @Route ("/products/add", method="POST")
   * @return Response
   */
  router.post('/products/add', (request, response, next) => {
    // console.log(process.env.DATABASE_HOST);
    console.log(request.body);
    response.send('Hello');
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

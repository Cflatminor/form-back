const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const ProductEntity = require(path.resolve('src/entities/ProductEntity.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");

  /**
   * @Route ("/admin/products", method="GET")
   */
  router.get('/admin/products', (request, response, next) => {
    cluster.collection('vape-juices').find().toArray(function(err, data) {
      if (err) { throw err }

      response.send(data);
    });
  });


  /**
   * @Route ("/admin/products/add", method="POST")
   */
  router.post('/admin/products/add', (request, response, next) => {
    const product = new ProductEntity(request.body);

    cluster.collection('vape-juices').insertOne(product)
      .then(result => {console.log ('success insert note! id = ' + result.insertedId);})
      .catch(err => console.error(`Failed to insert item: ${err}`));

    response.status(200).send('product added');
  });


  /**
   * @Route ("/admin/products/edit", method="GET")
   */
  router.get('/admin/products/edit', (request, response, next) => {
    const details = { '_id': new ObjectID(request.query.id) };

    cluster.collection('vape-juices').findOne(details, (error, item) => {
      if (error) {
        response.send({'error':'An error has occurred'});
      } else {
        response.send(item);
      }
    });
  });


  /**
   * @Route ("/admin/products/edit", method="POST")
   */
  router.post('/admin/products/edit', (request, response, next) => {
    // todo updateOne by get parameter
  });


  /**
   * @Route ("/admin/products/delete", method="POST")
   */
  router.post('/admin/products/delete/:id', (request, response, next) => {
    const details = { '_id': new ObjectID(request.params.id) };

    cluster.collection('vape-juices').deleteOne(details)
      .then(function() {
        response.status(200).send('product deleted');
      });
  });

  return router;
};

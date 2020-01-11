const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const ProductEntity = require(path.resolve('src/entities/ProductEntity.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");
  const collection = 'vape-juices';

  /**
   * @Route ("/admin/products", method="GET")
   */
  router.get('/admin/products', (request, response) => {
    cluster
      .collection(collection)
      .find()
      .toArray(function(error, data) {
      if (error) { throw err }

      response.send(data);
    });
  });


  /**
   * @Route ("/admin/products/add", method="POST")
   */
  router.post('/admin/products/add', (request, response) => {
    const product = new ProductEntity(request.body);

    cluster
      .collection(collection)
      .insertOne(product)
      .then(result => console.log(`Success insert note! id = ${result.insertedId}`))
      .catch(error => console.error(`Failed to insert item: ${error}`));

    response.status(200).send('product added');
  });


  /**
   * @Route ("/admin/products/edit", method="GET")
   */
  router.get('/admin/products/edit', (request, response) => {
    const details = { '_id': new ObjectID(request.query.id) };

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



  /**
   * @Route ("/admin/products/edit", method="POST")
   */
  router.post('/admin/products/edit', (request, response, next) => {
    // todo updateOne by get parameter
  });


  /**
   * @Route ("/admin/products/delete", method="POST")
   */
  router.post('/admin/products/delete/:id', (request, response) => {
    const details = { '_id': new ObjectID(request.params.id) };

    cluster
      .collection(collection)
      .deleteOne(details)
      // .then(result => console.log(`Success delete note! id = ${result.insertedId}`))
      .then(console.log('Success delete note'))
      .catch(error => console.error(`Failed to delete item: ${error}`));

    response.status(200).send('product deleted');
  });

  return router;
};

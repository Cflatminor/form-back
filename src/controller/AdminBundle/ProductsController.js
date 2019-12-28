const ObjectID = require('mongodb').ObjectID;

function CreateProduct(product) {
  this.brand = product.brand;
  this.title = product.title;
  this.price = product.price;
  this.rating = product.rating;
  this.isAvailable = product.isAvailable;
}

module.exports = function(router, database) {
  /**
   * @Route ("/admin/products", method="GET")
   */
  router.get('/admin/products', (request, response, next) => {
    const cluster = database.db("Cluster0");

    cluster.collection('vape-juices').find().toArray(function(err, data) {
      if (err) { throw err }

      response.send(data);
    });
  });


  /**
   * @Route ("/admin/products/add", method="POST")
   */
  router.post('/admin/products/add', (request, response, next) => {
    const product = new CreateProduct({
      brand: request.body.brand,
      title: request.body.title,
      price: request.body.price,
      rating: request.body.rating,
      isAvailable: request.body.isAvailable,
    });

    const cluster = database.db("Cluster0");

    cluster.collection('vape-juices').insertOne(product)
      .then(result => {console.log ('success insert note! id = ' + result.insertedId);})
      .catch(err => console.error(`Failed to insert item: ${err}`));

    response.status(200).send('product added');
  });


  /**
   * @Route ("/admin/products/edit", method="GET")
   */
  router.get('/admin/products/edit', (request, response, next) => {
    const id = request.query.id;
    const details = { '_id': new ObjectID(id) };
    const cluster = database.db("Cluster0");

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
    // todo updateOne
  });


  /**
   * @Route ("/admin/products/delete", method="POST")
   */
  router.post('/admin/products/delete/:id', (request, response, next) => {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    const cluster = database.db("Cluster0");

    cluster.collection('vape-juices').deleteOne(details)
      .then(function() {
        response.status(200).send('product deleted');
      });
  });

  return router;
};

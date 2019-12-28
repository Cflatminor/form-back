// const path = require('path');
const ObjectID = require('mongodb').ObjectID;
// const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

function CreateProduct(product) {
  this.brand = product.brand;
  this.title = product.title;
  this.price = product.price;
  this.rating = product.rating;
  this.isAvailable = product.isAvailable;
}

module.exports = function(router, database) {
  /**
   * @Route ("/admin/products/add", method="POST")
   */
  router.post('/admin/products/add', (request, response, next) => {
    // console.log(process.env.DATABASE_HOST);
    console.log(request.body);

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

  return router;
};

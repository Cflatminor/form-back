const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));
const ProductEntity = require(path.resolve('src/entities/ProductEntity.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");
  const collection = 'vape-juices';
  let collectionSize = 0;

  cluster
    .collection(collection)
    .countDocuments({}, (error, count) => {
      collectionSize = count;
    });

  /**
   * @Route ("/admin/products", method="GET")
   */
  router.get('/admin/products', (request, response) => {
    let currentPage = request.query.page;
    let itemsPerPage = 4;

    cluster
      .collection(collection)
      .find({}, {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      })
      .toArray(function(error, data) {
        if (error) {
          throw error
        } else {
          response.send(new CatalogModel({
            products: data,
            pagesCount: Math.ceil(collectionSize / itemsPerPage),
            currentPage: currentPage,
          }));
          // //Page 2
          // users = db.users.find({'_id'> last_id}). limit(10);
          // //Update the last id with the id of the last document in this page
          // last_id = ...
        }
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

    response.status(200).send('Product Added');
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
  router.post('/admin/products/edit', (request, response) => {
    const details = { '_id': new ObjectID(request.query.id) };
    const product = { $set: request.body }; // todo adapter?

    cluster
      .collection(collection)
      .updateOne(details, product, (error) => {
        if (error) {
          response.send({'error':'An error has occurred'});
        } else {
          response.status(200).send('Product Updated');
        }
      });
  });

  /**
   * @Route ("/admin/products/delete", method="POST")
   */
  router.post('/admin/products/delete/:id', (request, response) => {
    const details = { '_id': new ObjectID(request.params.id) };

    cluster
      .collection(collection)
      .deleteOne(details)
      .then(result => console.log(`Success delete note! id = ${result.insertedId}`)) // todo undefined
      .catch(error => console.error(`Failed to delete item: ${error}`));

    response.status(200).send('Product Deleted');
  });

  return router;
};

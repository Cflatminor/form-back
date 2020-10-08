const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const CatalogModel = require(path.resolve('src/model/CatalogModel.js'));

module.exports = function(router, database) {
  const cluster = database.db("Cluster0");
  const collection = 'vape-juices';

  /**
   * @Route ("/catalog", method="GET")
   * @query page
   * @query itemsPerPage
   * @return Response
   */
  router.get('/catalog', async (request, response) => {
    const page = Number(request.query.page - 1) || 0;
    const items = Number(request.query.itemsPerPage) || 0;

    const products = await cluster
      .collection(collection)
      .find()
      .skip(page * items)
      .limit(items)
      .toArray()
    //   .toArray(function(error, data) {
    //   if (error) { throw error }
    //
    //   response.send(new CatalogModel(data));
    // });

    const totalCount = await cluster
        .collection(collection).countDocuments();

    response.send(new CatalogModel({
      currentPage: page + 1,
      totalCount,
      products
    }));
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

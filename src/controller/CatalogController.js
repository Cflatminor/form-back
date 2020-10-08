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

//   // GET - Shop Product Page | - Displaying demanded product page with page numbers
//   router.get('/search/:page', async (req, res, next) => {
// // Declaring variable
//     const resPerPage = 9; // results per page
//     const page = req.params.page || 1; // Page
//     try {
//       if (req.query.search) {
// // Declaring query based/search variables
//         const searchQuery = req.query.search,
//           regex = new RegExp(escapeRegex(req.query.search), 'gi');
// // Find Demanded Products - Skipping page values, limit results       per page
//         const foundProducts = await cluster
//           .collection(collection).find({name: regex})
//           .skip((resPerPage * page) - resPerPage)
//           .limit(resPerPage);
// // Count how many products were found
//         const numOfProducts = await cluster
//           .collection(collection).count({name: regex});
// // Renders The Page
//         res.send({
//           products: foundProducts,
//           currentPage: page,
//           pages: Math.ceil(numOfProducts / resPerPage),
//           searchVal: searchQuery,
//           numOfResults: numOfProducts
//         });
//       }
//     } catch (err) {
//       throw new Error(err);
//     }
//   });

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

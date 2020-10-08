//   // GET - Shop Product Page | - Displaying demanded product page with page numbers // todo enable this file int index
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

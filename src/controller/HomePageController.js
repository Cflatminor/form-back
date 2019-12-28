const path = require('path');
const HomePageModel = require(path.resolve('src/model/HomePageModel.js'));

module.exports = function(router, database) {
  /**
   * @Route ("/", method="GET")
   * @return Response
   */
  router.get('/', (request, response, next) => {
    response.send(new HomePageModel());
  });

  return router;
};

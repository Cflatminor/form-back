const path = require('path');

module.exports = function(router) {
  /**
   * @Route ("*", method="GET")
   * @return Response
   */
  router.get('*', (request, response) => {
    response.status(404).send('404 error!');
  });

  return router;
};

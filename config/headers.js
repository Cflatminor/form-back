module.exports = (request, response, next) =>  {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With, remember-me');
  response.setHeader('Access-Control-Allow-Credentials', true);

  next();
};

module.exports = function paginate(cluster, collection, response, size) {
  cluster
    .collection(collection)
    .find()
    .limit(size)
    .toArray(function(error, data) {
      if (error) {
        throw error
      } else {
        response.send(data);

        // //Page 1
        // db.users.find().limit(pageSize);
        // //Find the id of the last document in this page
        // last_id = ...
        //
        // //Page 2
        // users = db.users.find({'_id'> last_id}). limit(10);
        // //Update the last id with the id of the last document in this page
        // last_id = ...
      }
    });
}

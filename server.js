// NEW CONNECT! FULLY WORKING AND 3.0 +
database.connect(uri, dbOptions, function(err, client) {
  if (err) { throw err }

  const cluster = client.db("Cluster0");

  cluster.collection('fruits').find().toArray(function(err, result) {
    if (err) { throw err }

    response.send(result);
  });

  client.close();
});
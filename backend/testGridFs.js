const assert = require('assert');
const fs = require('fs');
const mongodb = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'testGridFs';

const client = new mongodb.MongoClient(uri);

client.connect(function(error) {
  assert.ifError(error);

  const db = client.db(dbName);

  var bucket = new mongodb.GridFSBucket(db);

  fs.createReadStream('./photo.jpg').
    pipe(bucket.openUploadStream('photo.jpg')).
    on('error', function(error) {
      assert.ifError(error);
    }).
    on('finish', function() {
      console.log('done!');
      process.exit(0);
    });
});
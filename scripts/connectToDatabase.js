const MongoClient = require('mongodb').MongoClient;

const http = require('http');

http.get('http://mongo:27017', (res) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    resp.on('end', () => {
      console.log(data);
    });
});

const url = "mongodb://mongo:27017/";

const connectToDatabase = async () => {
    const client = new MongoClient(url);
    await client.connect();
    const database = await client.db('lynith-www');
    return database;
}

connectToDatabase().then((database) => {
    console.log("Connected to database!");
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
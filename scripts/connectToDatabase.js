const MongoClient = require('mongodb').MongoClient;

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
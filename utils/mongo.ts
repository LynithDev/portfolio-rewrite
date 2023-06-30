import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URL as string;

const client = new MongoClient(URI);
let _isConnected = false;

export async function connect() {
    console.log("Attempting to connect to " + URI);
    client.connect().then(() => {
        _isConnected = true;
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
        console.error("Failed to connect to MongoDB");
        process.exit(1);
    });
}

export async function close() {
    _isConnected = false;
    return client.close();
}

export const isConnected = () => _isConnected;

export const database = () => client.db(process.env.MONGO_DB);

const mongo = {
    connect,
    close,
    isConnected,
    database
}

export default mongo;
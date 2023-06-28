import { MongoClient } from "mongodb";

const URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@` +
    `${process.env.MONGO_IP}/${process.env.MONGO_DB}`;

const client = new MongoClient(URI);
let _isConnected = false;

export async function connect() {
    const timeout = setTimeout(() => {
        throw new Error('Failed to connect to database');
    }, 10 * 1000);

    await client.connect();
    _isConnected = true;
    console.log("Connected to MongoDB");
    clearTimeout(timeout);
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
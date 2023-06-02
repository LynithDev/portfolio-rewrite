import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL as string);
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
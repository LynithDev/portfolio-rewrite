import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL as string;

let client: MongoClient;
export let clientPromise: Promise<MongoClient>;

console.log("Attempting to connect to " + uri);
if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function close() {
    return client.close();
}

export const database = async () => (await clientPromise).db(process.env.MONGO_DB);

const mongo = {
    close,
    database
}

export default mongo;
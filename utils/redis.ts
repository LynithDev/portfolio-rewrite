import { RedisClientType, createClient, createCluster } from "redis";

let cluster: RedisClientType | null = null;
let connected = false;

export const connect = async () => {
    if (connected) return cluster;
    cluster = createClient({
        url: process.env.REDIS_URL,
    });
    await cluster.connect();
    connected = cluster != null;
    console.log("Connected to Redis");
}

export const disconnect = async () => {
    if (!connected) return;
    await cluster?.quit();
    cluster = null;
    connected = false;
}

export const getCluster = () => cluster;

const redis = {
    connect,
    disconnect,
    getCluster,
}

export default redis;
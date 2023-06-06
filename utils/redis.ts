import { createCluster } from "redis";

const cluster = createCluster({
    rootNodes: [
        {
            url: process.env.REDIS_URL
        }
    ]
});

cluster.on("error", (err) => {
    console.error("Redis error: ", err);
});

const redis = {
    connected: () => cluster.isOpen,
    get: cluster.get,
    set: cluster.set,
    del: cluster.del,
    exists: cluster.exists,
    connect: cluster.connect,
    disconnect: cluster.disconnect,
    quit: cluster.quit,

    cluster
}

export const get = async (key: string) => {
    // if (!redis.connected()) {
    //     await redis.connect();
    // }

    return await redis.get(key);
}
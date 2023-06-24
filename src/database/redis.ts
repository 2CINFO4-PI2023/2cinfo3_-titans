import { createClient } from "redis";

export default async function connectRedis() {
  try {
    const redisClient = createClient();
    await redisClient.connect()
    console.log("Successfully connected to redis server")
    return redisClient;
  } catch (error:any) {
    console.log("An error occured when connecting to redis server",error)
  }
}

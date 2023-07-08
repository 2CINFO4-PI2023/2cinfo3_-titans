import { RedisClientType } from "redis";
import { InternalError } from "../../../errors/InternalError";

export interface ITokenRepository {
  set(key: string, value: any,expireAt?:number): void;
  get(key: string): any;
}
export class TokenRepositoy implements ITokenRepository {
  constructor(private redisClient: RedisClientType) {}
  set(key: string, value: any,expireAt?:number): void {
    try {
      this.redisClient.set(key, value);
      if(expireAt){
        this.redisClient.expire(key,expireAt);
      }
    } catch (error: any) {
      throw new InternalError(error);
    }
  }
  get(key: string): any {
    return this.redisClient.get(key);
  }
}

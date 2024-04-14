import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  /**
   * 封装get方法
   */
  async get(key: string) {
    return await this.redisClient.get(key);
  }

  /**
   * 封装set方法
   */
  async set(key: string, value: string, expireTime?: number) {
    await this.redisClient.set(key, value);

    if (expireTime) {
      await this.redisClient.expire(key, expireTime);
    }
  }

  /**
   * 封装hashGetAll方法
   */
  async hashGetAll(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  /**
   * 封装hashGet方法
   */
  async hashGet(key: string, field: string) {
    return await this.redisClient.hGet(key, field);
  }

  /**
   * 封装hashSet方法
   */
  async hashSet(key: string, obj: Record<string, any>, expireTime?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }

    if (expireTime) {
      await this.redisClient.expire(key, expireTime);
    }
  }
}

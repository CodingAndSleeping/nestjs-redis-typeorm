import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const clint = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        await clint.connect();
        return clint;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}

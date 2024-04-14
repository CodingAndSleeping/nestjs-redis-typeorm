import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private articleRepository: Repository<Article>;

  @Inject(RedisService)
  private redisService: RedisService;

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id },
    });
  }

  async viewArticle(id: number, userId: string) {
    const viewCount = await this.redisService.hashGet(
      `article_${id}`,
      'viewCount',
    );

    if (!viewCount) {
      const article = await this.getArticleById(id);

      article.viewCount++;

      await this.articleRepository.update(
        { id },
        {
          viewCount: article.viewCount,
        },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 300);

      return article.viewCount;
    }

    const flag = await this.redisService.get(`user_${userId}_article_${id}`);

    if (flag) {
      return Number(viewCount);
    }

    await this.redisService.hashSet(`article_${id}`, {
      viewCount: Number(viewCount) + 1,
    });

    await this.redisService.set(`user_${userId}_article_${id}`, 1, 300);

    return Number(viewCount) + 1;
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys('article_*');

    for (const key of keys) {
      const viewCount = await this.redisService.hashGet(key, 'viewCount');

      const [, id] = key.split('_');

      await this.articleRepository.update(
        {
          id: Number(id),
        },
        {
          viewCount: Number(viewCount),
        },
      );
    }
  }
}

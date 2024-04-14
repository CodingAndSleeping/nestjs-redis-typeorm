import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  @Cron('0 0 4 * *')
  async handleCron() {
    await this.articleService.flushRedisToDB();
  }
}

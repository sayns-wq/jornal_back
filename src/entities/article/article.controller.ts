import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/:id')
  @HttpCode(200)
  async getArticle(@Param('id') id: number) {
    const article = await this.articleService.getArticle(id);
    return { status: 'ok', data: article };
  }
  @Patch('/:id')
  @HttpCode(200)
  async updateArticle(@Param('id') id: number, @Body() body: ArticleDto) {
    const updatedArticle = await this.articleService.updateArticle(id, body);
    if (!updatedArticle) {
      throw new NotFoundException(`Article ${id} not found`);
    }
    return updatedArticle;
  }
  @Get('/')
  @HttpCode(200)
  async getAllArticles(@Query() query) {
    let articles;
    if (query.limit) {
      articles = await this.articleService.getAllArticlesWithLimit({
        limit: query.limit,
      });
    } else {
      articles = await this.articleService.getAllArticles();
    }

    return { status: 'ok', data: articles };
  }
  @Post('/')
  @HttpCode(200)
  async createUser(@Body() body: ArticleDto) {
    const createdArticle = await this.articleService.createArticle(body);
    return { status: 'ok', id: createdArticle.id };
  }
  @Delete('/:id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: number) {
    this.articleService.deleteArticle(id);
    return { status: 'ok' };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  public async createArticle(articleData: ArticleDto) {
    const newArticle = this.articleRepository.create(articleData);
    await this.articleRepository.save(newArticle);
    return newArticle;
  }
  public async updateArticle(id: number, articleData: ArticleDto) {
    const updatedArticle = await this.articleRepository.update(id, articleData);
    return updatedArticle;
  }
  public async getArticle(id: number) {
    return await this.articleRepository.findOne({ where: { id } });
  }
  public async deleteArticle(id: number) {
    return await this.articleRepository.delete({ id });
  }
  public async getAllArticles() {
    return await this.articleRepository.find({
      select: ['id', 'articleData', 'header', 'tags', 'createdAt'],
    });
  }
}

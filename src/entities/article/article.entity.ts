import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'article_data', type: 'varchar' })
  articleData: string;

  @Column({ name: 'tags', type: 'varchar' })
  tags: string;

  @Column({ name: 'header', type: 'varchar', nullable: true })
  header: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;
}

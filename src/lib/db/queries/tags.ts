import { db } from '../index';

// 全てのタグを取得する関数
export async function getAllTags() {
  const tags = await db
    .selectFrom('tags')
    .selectAll()
    .orderBy('name', 'asc')
    .execute();
  
  return tags;
}

// 特定のスラッグに一致するタグを取得する関数
export async function getTagBySlug(slug: string) {
  const tag = await db
    .selectFrom('tags')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirst();
  
  return tag;
}

// 複数のタグをIDに基づいて取得する関数
export async function getTagsByIds(ids: number[]) {
  if (ids.length === 0) return [];
  
  const tags = await db
    .selectFrom('tags')
    .selectAll()
    .where('id', 'in', ids)
    .execute();
  
  return tags;
}

// 人気のあるタグを取得する関数
export async function getPopularTags(limit: number = 8) {
  // 記事タグの関連性に基づいて人気タグを取得
  const tags = await db
    .selectFrom('tags')
    .innerJoin('article_tags', 'tags.id', 'article_tags.tagId')
    .select(['tags.id', 'tags.name', 'tags.slug'])
    .groupBy('tags.id')
    .orderBy(db.fn.count('article_tags.articleId'), 'desc')
    .limit(limit)
    .execute();

  return tags;
}
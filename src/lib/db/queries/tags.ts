import { getDb } from '../index';

// 全てのタグを取得する関数
export async function getAllTags() {
  try {
    const db = getDb();
    const tags = await db
      .selectFrom('tags')
      .selectAll()
      .orderBy('name', 'asc')
      .execute();
    
    return tags;
  } catch (error) {
    console.error('タグの取得に失敗しました:', error);
    return [];
  }
}

// 特定のスラッグに一致するタグを取得する関数
export async function getTagBySlug(slug: string) {
  try {
    const db = getDb();
    const tag = await db
      .selectFrom('tags')
      .selectAll()
      .where('slug', '=', slug)
      .executeTakeFirst();
    
    return tag;
  } catch (error) {
    console.error(`スラッグ "${slug}" のタグ取得に失敗しました:`, error);
    return null;
  }
}

// 複数のタグをIDに基づいて取得する関数
export async function getTagsByIds(ids: number[]) {
  try {
    if (ids.length === 0) return [];
    
    const db = getDb();
    const tags = await db
      .selectFrom('tags')
      .selectAll()
      .where('id', 'in', ids)
      .execute();
    
    return tags;
  } catch (error) {
    console.error('IDによるタグの取得に失敗しました:', error);
    return [];
  }
}

// 人気のあるタグを取得する関数
export async function getPopularTags(limit: number = 8) {
  try {
    const db = getDb();
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
  } catch (error) {
    console.error('人気タグの取得に失敗しました:', error);
    return [];
  }
}
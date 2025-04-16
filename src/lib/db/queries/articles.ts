import { getDb } from '../index';

// 公開済みの記事を取得する関数
export async function getPublishedArticles(limit: number = 10, offset: number = 0) {
  try {
    const db = getDb();
    const articles = await db
      .selectFrom('articles')
      .selectAll()
      .where('isPublished', '=', true)
      .orderBy('publishedAt', 'desc')
      .limit(limit)
      .offset(offset)
      .execute();
    
    return articles;
  } catch (error) {
    console.error('公開済み記事の取得に失敗しました:', error);
    return [];
  }
}

// 人気記事を取得する関数
export async function getPopularArticles(limit: number = 5) {
  try {
    const db = getDb();
    const articles = await db
      .selectFrom('articles')
      .selectAll()
      .where('isPublished', '=', true)
      .orderBy('viewCount', 'desc')
      .limit(limit)
      .execute();
    
    return articles;
  } catch (error) {
    console.error('人気記事の取得に失敗しました:', error);
    return [];
  }
}

// 特定のスラッグに一致する記事を取得する関数
export async function getArticleBySlug(slug: string) {
  try {
    const db = getDb();
    const article = await db
      .selectFrom('articles')
      .selectAll()
      .where('slug', '=', slug)
      .executeTakeFirst();
    
    return article;
  } catch (error) {
    console.error(`スラッグ "${slug}" の記事取得に失敗しました:`, error);
    return null;
  }
}

// 記事のPVカウントを増加させる関数
export async function incrementArticleViewCount(id: number) {
  try {
    const db = getDb();
    await db
      .updateTable('articles')
      .set((eb) => ({ viewCount: eb('viewCount', '+', 1) }))
      .where('id', '=', id)
      .execute();
    return true;
  } catch (error) {
    console.error(`記事ID ${id} のPVカウント増加に失敗しました:`, error);
    return false;
  }
}

// 記事に関連するタグIDを取得する関数
export async function getArticleTagIds(articleId: number) {
  try {
    const db = getDb();
    const articleTags = await db
      .selectFrom('article_tags')
      .select('tagId')
      .where('articleId', '=', articleId)
      .execute();
    
    return articleTags.map(tag => tag.tagId);
  } catch (error) {
    console.error(`記事ID ${articleId} のタグ取得に失敗しました:`, error);
    return [];
  }
}

// 特定のゲームに関連する記事を取得する関数
export async function getArticlesByGameSlug(gameSlug: string, limit: number = 10) {
  try {
    const db = getDb();
    const articles = await db
      .selectFrom('articles')
      .selectAll()
      .where('gameSlug', '=', gameSlug)
      .where('isPublished', '=', true)
      .orderBy('publishedAt', 'desc')
      .limit(limit)
      .execute();
    
    return articles;
  } catch (error) {
    console.error(`ゲームスラッグ "${gameSlug}" の記事取得に失敗しました:`, error);
    return [];
  }
}
import { db } from '../index';

// 公開済みの記事を取得する関数
export async function getPublishedArticles(limit: number = 10, offset: number = 0) {
  const articles = await db
    .selectFrom('articles')
    .selectAll()
    .where('isPublished', '=', true)
    .orderBy('publishedAt', 'desc')
    .limit(limit)
    .offset(offset)
    .execute();
  
  return articles;
}

// 人気記事を取得する関数
export async function getPopularArticles(limit: number = 5) {
  const articles = await db
    .selectFrom('articles')
    .selectAll()
    .where('isPublished', '=', true)
    .orderBy('viewCount', 'desc')
    .limit(limit)
    .execute();
  
  return articles;
}

// 特定のスラッグに一致する記事を取得する関数
export async function getArticleBySlug(slug: string) {
  const article = await db
    .selectFrom('articles')
    .selectAll()
    .where('slug', '=', slug)
    .executeTakeFirst();
  
  return article;
}

// 記事のPVカウントを増加させる関数
export async function incrementArticleViewCount(id: number) {
  await db
    .updateTable('articles')
    .set((eb) => ({ viewCount: eb('viewCount', '+', 1) }))
    .where('id', '=', id)
    .execute();
}

// 記事に関連するタグIDを取得する関数
export async function getArticleTagIds(articleId: number) {
  const articleTags = await db
    .selectFrom('article_tags')
    .select('tagId')
    .where('articleId', '=', articleId)
    .execute();
  
  return articleTags.map(tag => tag.tagId);
}

// 特定のゲームに関連する記事を取得する関数
export async function getArticlesByGameSlug(gameSlug: string, limit: number = 10) {
  const articles = await db
    .selectFrom('articles')
    .selectAll()
    .where('gameSlug', '=', gameSlug)
    .where('isPublished', '=', true)
    .orderBy('publishedAt', 'desc')
    .limit(limit)
    .execute();
  
  return articles;
}
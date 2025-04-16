import { notFound } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { getTagBySlug } from '@/lib/db/queries/tags';
import { db } from '@/lib/db/index';
import { ArticlesTable } from '@/lib/db/schema';

// タグに関連する記事を取得する関数
async function getArticlesByTag(tagSlug: string) {
  // タグIDを取得
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return [];

  // タグに関連する記事を取得
  const articles = await db
    .selectFrom('articles')
    .leftJoin('article_tags', 'articles.id', 'article_tags.articleId')
    .where('article_tags.tagId', '=', tag.id)
    .where('articles.isPublished', '=', true)
    .selectAll('articles')
    .orderBy('articles.publishedAt', 'desc')
    .execute();

  return articles;
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  // タグ情報を取得
  const tag = await getTagBySlug(params.slug);
  
  // タグが存在しない場合は404ページを表示
  if (!tag) {
    notFound();
  }
  
  // このタグに関連する記事を取得
  const articles = await getArticlesByTag(params.slug);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <span className="mr-2">タグ:</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {tag.name}
            </span>
          </h1>
          <p className="text-gray-600">
            {tag.name}に関連する攻略記事や情報を集めたページです
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">関連記事 ({articles.length}件)</h2>
            <ul className="divide-y">
              {articles.map((article) => {
                // 日付処理の改善
                const formattedDate = (() => {
                  if (!article.publishedAt) return '';
                  try {
                    // publishedAtが文字列の場合
                    if (typeof article.publishedAt === 'string') {
                      return new Date(article.publishedAt).toLocaleDateString('ja-JP');
                    }
                    // その他の場合（ColumnTypeオブジェクトなど）
                    return new Date(String(article.publishedAt)).toLocaleDateString('ja-JP');
                  } catch (e) {
                    console.error('日付の変換に失敗:', e);
                    return '';
                  }
                })();

                return (
                  <li 
                    key={typeof article.id === 'object' ? String(article.id) : article.id} 
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <Link
                      href={`/games/${article.gameSlug}/guide/${article.slug}`}
                      className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                    >
                      <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {formattedDate && `${formattedDate}`}
                      </p>
                      <p className="text-gray-700">
                        {article.content.substring(0, 120)}...
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">このタグに関連する記事はまだありません</p>
          </div>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
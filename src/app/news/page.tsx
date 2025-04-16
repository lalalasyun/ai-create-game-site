import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ArticleCard from '@/components/ArticleCard';
import { getPublishedArticles } from '@/lib/db/queries/articles';
import { ArticlesTable } from '@/lib/db/schema';

export default async function NewsPage() {
  // SQLiteから公開済み記事を取得
  const articles = await getPublishedArticles(20);
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-8">最新ニュース・攻略記事</h1>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => {
              // 日付の処理を関数内で行う
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
                <ArticleCard 
                  key={typeof article.id === 'object' ? String(article.id) : article.id}
                  title={article.title}
                  excerpt={article.content.substring(0, 120) + '...'}
                  slug={article.slug}
                  gameSlug={article.gameSlug || ''}
                  publishDate={formattedDate}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">記事がまだ公開されていません</p>
          </div>
        )}
      </div>
      
      <Sidebar />
    </div>
  );
}

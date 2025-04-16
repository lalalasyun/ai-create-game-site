import Link from 'next/link';
import { getPopularArticles } from '@/lib/db/queries/articles';
import { getPopularTags } from '@/lib/db/queries/tags';

// サーバーコンポーネントに変更
export default async function Sidebar() {
  // データベースから人気記事を取得
  const popularArticles = await getPopularArticles(5);
  
  // データベースから人気タグを取得
  const tags = await getPopularTags(8);

  return (
    <aside className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
          人気記事ランキング
        </h2>
        <ol className="space-y-1">
          {popularArticles.map((article, index) => (
            <li key={article.id} className="ranking-item">
              <span className="ranking-number">{index + 1}</span>
              <Link href={`/games/${article.gameSlug}/guide/${article.slug}`} className="hover:text-blue-600 transition-colors">
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
          タグクラウド
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`} className="tag">
              {tag.name}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

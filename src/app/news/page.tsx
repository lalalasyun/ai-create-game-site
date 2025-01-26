import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

const newsArticles = [
  {
    title: 'FF7 リバース アップデート情報',
    excerpt: '最新パッチで追加された新コンテンツと修正内容をまとめて解説。新たな装備とミニゲームが追加されました。',
    date: '2024.03.21',
    link: '/games/ff7/news/update',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ゼルダの伝説 次回DLCの情報公開',
    excerpt: '新たなダンジョンと装備の追加が決定。リンクの新能力も登場予定です。',
    date: '2024.03.20',
    link: '/games/zelda/news/dlc',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ドラクエモンスターズ3 最新イベント情報',
    excerpt: '期間限定の特別モンスターが登場。レアな配合素材もゲットできるチャンス！',
    date: '2024.03.19',
    link: '/games/dragon-quest/news/event',
    thumbnail: 'https://placehold.co/600x400',
  },
];

export default function NewsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
      <main>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">最新攻略情報</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {newsArticles.map((article) => (
            <ArticleCard
              key={article.link}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              link={article.link}
              thumbnail={article.thumbnail}
            />
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

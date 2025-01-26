import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

const latestArticles = [
  {
    title: 'ゼルダの伝説 ティアーズ オブ ザ キングダム 攻略',
    excerpt: '最新DLCを含む完全攻略情報を掲載中！ストーリー攻略からサイドクエスト、収集要素まで詳しく解説します。',
    date: '2024.03.21',
    link: '/games/zelda/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'FF7 リバース 攻略',
    excerpt: 'ボス攻略からサイドクエストまで詳しく解説！最強装備・レベル上げ・やり込み要素も網羅しています。',
    date: '2024.03.20',
    link: '/games/ff7/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ドラゴンクエストモンスターズ 3 攻略',
    excerpt: 'モンスター配合の最新情報を追加！最強モンスターの作り方や効率的な育成方法を紹介します。',
    date: '2024.03.19',
    link: '/games/dragon-quest/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ペルソナ6 攻略まとめ',
    excerpt: '日常パートの過ごし方やコープ攻略、ダンジョン攻略など、全てを詳しく解説しています。',
    date: '2024.03.18',
    link: '/games/persona6/guide',
    thumbnail: 'https://placehold.co/600x400',
  },
  {
    title: 'ポケモンSV DLC攻略',
    excerpt: '藍の円盤・碧の仮面の最新情報や攻略情報をいち早くお届けします。新ポケモンの情報も！',
    date: '2024.03.17',
    link: '/games/pokemon/dlc',
    thumbnail: 'https://placehold.co/600x400',
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
      <main>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">最新の攻略記事</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {latestArticles.map((article) => (
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
        </section>
      </main>
      <Sidebar />
    </div>
  );
}

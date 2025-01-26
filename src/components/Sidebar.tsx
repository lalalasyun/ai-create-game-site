import Link from 'next/link';

export default function Sidebar() {
  const popularArticles = [
    {
      id: 1,
      title: 'FF7 リバース 最強武器入手方法',
      link: '/games/ff7/weapons',
    },
    {
      id: 2,
      title: 'ゼルダの伝説 裏技・小技まとめ',
      link: '/games/zelda/tips',
    },
    {
      id: 3,
      title: 'ドラクエモンスターズ3 最強配合',
      link: '/games/dragon-quest/monster-fusion',
    },
    {
      id: 4,
      title: 'ペルソナ6 コープ攻略',
      link: '/games/persona6/coop',
    },
    {
      id: 5,
      title: 'ポケモンSV 対戦育成論',
      link: '/games/pokemon/battle',
    },
  ];

  const tags = [
    { id: 1, name: 'RPG', link: '/tags/rpg' },
    { id: 2, name: 'アクション', link: '/tags/action' },
    { id: 3, name: 'オープンワールド', link: '/tags/open-world' },
    { id: 4, name: 'シミュレーション', link: '/tags/simulation' },
    { id: 5, name: 'Switch', link: '/tags/switch' },
    { id: 6, name: 'PS5', link: '/tags/ps5' },
    { id: 7, name: '攻略', link: '/tags/guide' },
    { id: 8, name: '初心者向け', link: '/tags/beginner' },
  ];

  return (
    <aside className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
          人気記事ランキング
        </h2>
        <ol className="space-y-1">
          {popularArticles.map((article) => (
            <li key={article.id} className="ranking-item">
              <span className="ranking-number">{article.id}</span>
              <Link href={article.link} className="hover:text-blue-600 transition-colors">
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
            <Link key={tag.id} href={tag.link} className="tag">
              {tag.name}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

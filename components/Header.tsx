import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-width py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              <Link href="/">
                ゲーム攻略.com
              </Link>
            </h1>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 min-w-[300px]">
                <input
                  type="search"
                  placeholder="攻略情報を検索..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  検索
                </button>
              </div>
            </div>
          </div>
          <nav>
            <ul className="flex gap-8">
              <li>
                <Link href="/" className="nav-link">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/games" className="nav-link">
                  ゲーム一覧
                </Link>
              </li>
              <li>
                <Link href="/news" className="nav-link">
                  最新攻略情報
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

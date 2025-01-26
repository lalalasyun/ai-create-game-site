import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">人気ゲーム</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games/zelda" className="hover:text-white transition-colors">
                  ゼルダの伝説 ティアーズ オブ ザ キングダム
                </Link>
              </li>
              <li>
                <Link href="/games/ff7" className="hover:text-white transition-colors">
                  FF7 リバース
                </Link>
              </li>
              <li>
                <Link href="/games/dragon-quest" className="hover:text-white transition-colors">
                  ドラゴンクエストモンスターズ 3
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">フォロー</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">© 2024 ゲーム攻略.com All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

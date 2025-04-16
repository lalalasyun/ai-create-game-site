import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ensureDatabaseSetup } from '@/lib/db/setup';

// データベース初期化を非同期で実行
ensureDatabaseSetup().catch(console.error);

export const metadata: Metadata = {
  title: 'ゲーム攻略.com',
  description: 'ゲームの最新攻略情報を提供するサイト',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <Header />
        <div className="container-width py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">利用規約</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 prose max-w-none">
        <h2>はじめに</h2>
        <p>
          この利用規約（以下、「本規約」といいます。）は、ゲーム攻略.com（以下、「当サイト」といいます。）の
          利用条件を定めるものです。ユーザーの皆様（以下、「ユーザー」といいます。）には、本規約に従って、
          当サイトをご利用いただきます。
        </p>

        <h2>コンテンツの利用について</h2>
        <p>
          当サイトで提供される全てのコンテンツ（文章、画像、動画等）の著作権は、
          当サイトまたは当サイトにコンテンツを提供している第三者に帰属します。
        </p>
        <ul>
          <li>個人での閲覧、非営利目的での利用に限り、コンテンツの使用を許可します</li>
          <li>コンテンツの複製、転載、改変、販売等は禁止します</li>
          <li>引用する場合は、出典を明記してください</li>
        </ul>

        <h2>禁止事項</h2>
        <p>当サイトの利用にあたり、以下の行為を禁止します。</p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
          <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
        </ul>

        <h2>免責事項</h2>
        <p>
          当サイトの情報は、可能な限り正確な情報を提供するよう努めておりますが、
          その正確性、適切性、有用性等について、いかなる保証もいたしません。
          当サイトの利用により生じたいかなる損害についても、当サイトは責任を負いません。
        </p>

        <h2>利用規約の変更</h2>
        <p>
          当サイトは、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。
          変更後の利用規約は、当サイトに掲載した時点で効力を生じるものとします。
        </p>

        <h2>準拠法・裁判管轄</h2>
        <p>
          本規約の解釈にあたっては、日本法を準拠法とします。
          当サイトに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
        </p>

        <div className="mt-8 pt-4 border-t">
          <p className="text-sm text-gray-600">
            最終更新日: 2024年3月21日
          </p>
        </div>
      </div>
    </div>
  );
}

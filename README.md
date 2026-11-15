# Book Finder

[florinpop17/app-ideas](https://github.com/florinpop17/app-ideas) の課題「[Book Finder](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Book-Finder-App.md)」（Tier 2-Intermediate）をReactとTypeScriptで解いたもの。キーワードを入れると、Google Books APIで本を検索して一覧で表示する。

## 課題の要件

| 要件 | 状態 |
| --- | --- |
| 検索語を入力欄に入れられる | 満たす（空白だけの入力は送らない） |
| 送信するとAPIを呼び、タイトル・著者・出版日・画像などを持つ本の一覧を受け取る | 満たす。Google Books APIの `volumes?q=` を呼び、説明文の先頭150文字も出す |
| 本の一覧がページに表示される | 満たす。1回の検索でAPIの既定の件数（最大10件）を表示する |
| ボーナス: 外部サイトの詳細ページへのリンク | 満たす（Google Booksの `infoLink`） |
| ボーナス: レスポンシブデザイン | 満たす。カードのグリッドの列数を画面幅で変える |
| ボーナス: 読み込み中のアニメーション | 満たす（スピナー） |

ほかに、検索に失敗したときと0件のときのメッセージ、OSのダークモードに合わせた配色を入れた。

## 動かし方

APIキーは要らない。

```sh
npm install
npm run dev      # Vite の開発サーバ
```

## 使った技術

- React 19、TypeScript、Vite
- Google Books API（`fetch` で呼び、レスポンスを画面用の `Book` 型に詰め替える）
- CSS Grid（`repeat(auto-fill, minmax(...))`）とメディアクエリ

## 学んだこと

- 外部APIのレスポンスに型を付け、画面で使う形に変換してから状態に入れる書き方

# yakuhanjp-merge

## Test 1 (Merge Font)

YakuHanJP と NotoSansJP サブセットをマージして `./fonts/export/NotoSansJP-Merged-YakuHanJP-Bold.otf` を作成してみました。とりあえず 1 ウェイトのみ。1 ファイルで約物半角を適応した NotoSansJP が使えます。

現在はサブセットなので 1 ファイル 700KB と軽量ですが、ユーザー入力の多様性を考えるとフルセットの方が良いかもしれません。その場合は 1 ファイル 16MB 程度を想定する必要があります。

メリットはあらかじめフォントを用意するのでユーザー入力のたびに生成する必要がないこと。デメリットは容量の大きさ。

## Test 2 (Merge Script)

Google フォントの API で必要なテキストを指定してフォントをダウンロード。YakuHanJP を CDN からダウンロード。2 つを node.js 上でマージさせる...つもりでしたがマージする npm ライブラリが動いていません。node@18 と node@16 で試しましたがエラーを吐いています。未完成。

## License

- yakuhanjp-merge : MIT
- [Yaku Han JP](https://github.com/qrac/yakuhanjp) : SIL OFL 1.1
- [Noto Sans JP サブセット](https://github.com/ixkaito/NotoSansJP-subset) : SIL OFL 1.1
- [Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan) licensed under the SIL OFL 1.1

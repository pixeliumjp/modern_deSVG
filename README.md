# deSVG

### このフォークはなんですか？

このフォークはdeSVGをモダンな書き方に直したdeSVGです。
ES2023までの機能を活用し、deSVGの互換を保ちながら大部分を書き直しています。

### これは何をするものですか？

deSVGは、指定した `<img />` タグを受け取り、`src`
属性に設定されたSVGをfetchを使って取得し、その `<img />` タグをダウンロードした
`<svg />` に置き換えます。

### インストール

このリポジトリからファイルをダウンロードするか、[npm](https://www.npmjs.com/package/desvg)からインストールしてください。

### 使用方法

#### HTML

    <div>
    	<img src="xxxxx/sample.svg" class="replace-svg">
    </div>

#### JavaScript

    window.addEventListener('load', function(){
    	// 1. svg要素に置き換えたい
    	// 2. SVGパスからインラインスタイルタグを削除するかどうか
    	deSVG('.replace-svg', true);
    });

各画像に対して2回のネットワークリクエストが発生することを避けたい場合は、`src`
属性の代わりに `data-src="path/to/file"` で画像のパスを渡すことができます。
ただし、これにより画像の取得が完了するまで表示されないため、レイアウトシフトが発生する可能性があります。

### デモ

デモはまだありません。

### ソース

詳しい説明は、まだありません。

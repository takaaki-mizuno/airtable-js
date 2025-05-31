# airtable.js — Vanilla JS Wrapper for Airtable Web API

[日本語はこちら](#japanese)

**airtable.js** is a **~2KB** single-file JavaScript library that allows you to access the Airtable Web API (`https://api.airtable.com/v0/`) directly from the browser.  
It has no external dependencies. Simply load it with a `<script>` tag to perform CRUD operations (Create, Read, Update, Delete) with Personal Access Token authentication.

> **Target API**: Airtable Web API v0  
> **Authentication**: Personal Access Token (Bearer header)  
> **Browser Requirements**: Environments that support Fetch API (IE not supported)

---

## 1. Loading Methods

### Load from CDN (Recommended)

You can load directly from CDN in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/takaaki-mizuno/airtable-js@0.1.0/airtable.js"></script>
```

### Download and Use Locally

If you want to use it as a local file:

1. Download **airtable.js** from this repository.  
2. Place it in the same directory as your HTML file, or in any directory like `./libs/`.
3. Load it in your HTML as follows:

```html
<script src="./airtable.js"></script>
```

Both methods work the same way.

----

<a id="japanese"></a>
# airtable.js — Airtable Web API用バニラ JS ラッパー

**airtable.js** は、ブラウザだけで Airtable の Web API（`https://api.airtable.com/v0/`）にアクセスできる **約 2 KB** のシングルファイル JavaScript ライブラリです。  
外部依存はありません。`<script>` タグで読み込むだけで、Personal Access Token 認証付きの CRUD（取得・追加・更新・削除）処理が行えます。

> **対象 API**: Airtable Web API v0  
> **認証方式**: Personal Access Token（Bearer ヘッダー）  
> **必要ブラウザ**: Fetch API が使える環境（IE は非対応）

---

## 1. 読み込み方法

### CDN から読み込み（推奨）

HTML で次のように CDN から直接読み込めます：

```html
<script src="https://cdn.jsdelivr.net/gh/takaaki-mizuno/airtable-js@0.1.0/airtable.js"></script>
```

### ダウンロードして使用

ローカルファイルとして使いたい場合は：

1. このリポジトリから **airtable.js** をダウンロードします。  
2. HTML ファイルと同じディレクトリ、または任意の `./libs/` などに配置します。
3. HTML で次のように読み込みます。

```html
<script src="./airtable.js"></script>
```

どちらの方法でも同じように使用できます。


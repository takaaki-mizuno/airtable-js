# airtable.js — Vanilla JS Wrapper for Airtable Web API

**airtable.js** は、ブラウザだけで Airtable の Web API（`https://api.airtable.com/v0/`）にアクセスできる **約 2 KB** のシングルファイル JavaScript ライブラリです。  
外部依存はありません。`<script>` タグで読み込むだけで、Personal Access Token 認証付きの CRUD（取得・追加・更新・削除）処理が行えます。

> **対象 API**: Airtable Web API v0  
> **認証方式**: Personal Access Token（Bearer ヘッダー）  
> **必要ブラウザ**: Fetch API が使える環境（IE は非対応）

---

## 1. ダウンロード & 配置

1. このリポジトリから **airtable.js** を取得します。  
2. HTML ファイルと同じディレクトリ、または任意の `./libs/` などに配置します。
3. HTML で次のように読み込みます。

```html
<script src="./airtable.js"></script>

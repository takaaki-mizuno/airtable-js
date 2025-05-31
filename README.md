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

---

## 2. Basic Usage

### Initialize Client

First, create an Airtable client with your Personal Access Token:

```javascript
// Initialize with token and base ID
const airtable = new Airtable({
  token: 'your_personal_access_token',
  baseId: 'your_base_id'
});

// Or initialize with token only and set base later
const airtable = new Airtable({ token: 'your_personal_access_token' });
airtable.base('your_base_id');
```

### List Records

Get records from a table:

```javascript
// Get all records from 'Tasks' table
airtable.table('Tasks').list()
  .then(result => {
    console.log(result.records);
  });

// With parameters
airtable.table('Tasks').list({
  maxRecords: 10,
  view: 'Grid view',
  filterByFormula: '{Status} = "Done"'
})
  .then(result => {
    console.log(result.records);
  });
```

### Get Single Record

Retrieve a specific record by ID:

```javascript
airtable.table('Tasks').get('rec123456789')
  .then(record => {
    console.log(record.fields);
  });
```

### Create Record

Add a new record:

```javascript
airtable.table('Tasks').create({
  Title: 'New Task',
  Status: 'Todo',
  Priority: 'High'
})
  .then(record => {
    console.log('Created:', record.id);
  });
```

### Update Record

Update an existing record:

```javascript
airtable.table('Tasks').update('rec123456789', {
  Status: 'Done',
  CompletedAt: new Date().toISOString()
})
  .then(record => {
    console.log('Updated:', record.id);
  });
```

### Delete Record

Delete a record:

```javascript
airtable.table('Tasks').destroy('rec123456789')
  .then(deletedRecord => {
    console.log('Deleted:', deletedRecord.id);
  });
```

### Get All Records (with automatic pagination)

For large datasets, use `listAll()` to automatically handle pagination:

```javascript
airtable.table('Tasks').listAll({
  pageSize: 100,
  view: 'All Tasks'
})
  .then(allRecords => {
    console.log(`Total records: ${allRecords.length}`);
  });
```

---

## 3. Complete Example

Here's a complete HTML example:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Airtable.js Example</title>
</head>
<body>
  <h1>My Tasks</h1>
  <div id="tasks"></div>
  
  <script src="https://cdn.jsdelivr.net/gh/takaaki-mizuno/airtable-js@0.1.0/airtable.js"></script>
  <script>
    const airtable = new Airtable({
      token: 'your_personal_access_token',
      baseId: 'your_base_id'
    });

    // Display tasks
    async function displayTasks() {
      try {
        const result = await airtable.table('Tasks').list({
          maxRecords: 10,
          sort: [{ field: 'Created', direction: 'desc' }]
        });
        
        const tasksDiv = document.getElementById('tasks');
        tasksDiv.innerHTML = result.records.map(record => 
          `<div>${record.fields.Title} - ${record.fields.Status}</div>`
        ).join('');
      } catch (error) {
        console.error('Error:', error);
      }
    }

    displayTasks();
  </script>
</body>
</html>
```

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

---

## 2. 基本的な使い方

### クライアントの初期化

まず、Personal Access Token を使って Airtable クライアントを作成します：

```javascript
// トークンとベース ID で初期化
const airtable = new Airtable({
  token: 'your_personal_access_token',
  baseId: 'your_base_id'
});

// トークンのみで初期化して、後でベースを設定
const airtable = new Airtable({ token: 'your_personal_access_token' });
airtable.base('your_base_id');
```

### レコード一覧の取得

テーブルからレコードを取得します：

```javascript
// 'Tasks' テーブルの全レコードを取得
airtable.table('Tasks').list()
  .then(result => {
    console.log(result.records);
  });

// パラメータ付きで取得
airtable.table('Tasks').list({
  maxRecords: 10,
  view: 'Grid view',
  filterByFormula: '{Status} = "Done"'
})
  .then(result => {
    console.log(result.records);
  });
```

### 単一レコードの取得

ID を指定して特定のレコードを取得：

```javascript
airtable.table('Tasks').get('rec123456789')
  .then(record => {
    console.log(record.fields);
  });
```

### レコードの作成

新しいレコードを追加：

```javascript
airtable.table('Tasks').create({
  Title: 'New Task',
  Status: 'Todo',
  Priority: 'High'
})
  .then(record => {
    console.log('作成完了:', record.id);
  });
```

### レコードの更新

既存のレコードを更新：

```javascript
airtable.table('Tasks').update('rec123456789', {
  Status: 'Done',
  CompletedAt: new Date().toISOString()
})
  .then(record => {
    console.log('更新完了:', record.id);
  });
```

### レコードの削除

レコードを削除：

```javascript
airtable.table('Tasks').destroy('rec123456789')
  .then(deletedRecord => {
    console.log('削除完了:', deletedRecord.id);
  });
```

### 全レコードの取得（自動ページネーション）

大量データの場合、`listAll()` を使って自動的にページネーションを処理：

```javascript
airtable.table('Tasks').listAll({
  pageSize: 100,
  view: 'All Tasks'
})
  .then(allRecords => {
    console.log(`全レコード数: ${allRecords.length}`);
  });
```

---

## 3. 完全な使用例

完全な HTML の例：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Airtable.js Example</title>
</head>
<body>
  <h1>私のタスク</h1>
  <div id="tasks"></div>
  
  <script src="https://cdn.jsdelivr.net/gh/takaaki-mizuno/airtable-js@0.1.0/airtable.js"></script>
  <script>
    const airtable = new Airtable({
      token: 'your_personal_access_token',
      baseId: 'your_base_id'
    });

    // タスクを表示
    async function displayTasks() {
      try {
        const result = await airtable.table('Tasks').list({
          maxRecords: 10,
          sort: [{ field: 'Created', direction: 'desc' }]
        });
        
        const tasksDiv = document.getElementById('tasks');
        tasksDiv.innerHTML = result.records.map(record => 
          `<div>${record.fields.Title} - ${record.fields.Status}</div>`
        ).join('');
      } catch (error) {
        console.error('エラー:', error);
      }
    }

    displayTasks();
  </script>
</body>
</html>
```


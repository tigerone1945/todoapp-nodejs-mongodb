# Todo App with Node.js & MongoDB

シンプルなTodoアプリのREST APIです。Node.js、Express、MongoDB Atlasを使用して開発されています。

## 🚀 機能

- ✅ タスクの作成（CREATE）
- 📋 全タスクの取得（READ）
- 🔍 特定タスクの取得（READ）
- ✏️ タスクの更新（UPDATE）
- 🗑️ タスクの削除（DELETE）

## 🛠️ 技術スタック

- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment**: dotenv

## 📁 プロジェクト構成

```
todoapp-with-nodejs-mongodb/
├── app.js              # メインアプリケーションファイル
├── package.json        # 依存関係と設定
├── .env               # 環境変数（.gitignore済み）
├── controllers/
│   └── tasks.js       # タスクのビジネスロジック
├── models/
│   └── Task.js        # Mongooseスキーマ
├── routers/
│   └── tasks.js       # API ルート
└── db/
    └── connect.js     # MongoDB接続設定
```

## 🔧 APIエンドポイント

### Base URL: `http://localhost:3000/api/v1/tasks`

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET     | `/`           | 全タスクを取得 |
| POST    | `/`           | 新しいタスクを作成 |
| GET     | `/:id`        | 指定IDのタスクを取得 |
| PATCH   | `/:id`        | 指定IDのタスクを更新 |
| DELETE  | `/:id`        | 指定IDのタスクを削除 |

### リクエスト例

#### タスク作成
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "Learn React", "completed": false}'
```

#### 全タスク取得
```bash
curl -X GET http://localhost:3000/api/v1/tasks
```

#### タスク更新
```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/[task_id] \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🏗️ セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env`ファイルを作成し、MongoDB Atlas接続文字列を設定:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```

### 3. アプリケーションの起動
```bash
# 開発モード（nodemon使用）
npm run dev

# 本番モード
npm start
```

## 🗃️ データベーススキーマ

### Task Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 📝 開発者向けメモ

- MongoDB AtlasのNetwork Accessでアクセス元IPを許可する必要があります
- `.env`ファイルには機密情報が含まれているため、`.gitignore`に含まれています
- 本番環境では適切な認証とバリデーションの追加を推奨します

## 📄 ライセンス

ISC
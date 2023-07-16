import * as fs from 'fs';
import * as mysql from 'mysql2/promise';

interface ThreadInfo {
  thread_id: number;
  thread_name: string;
}

async function registerThread(threadInfo: ThreadInfo): Promise<void> {
  try {
    const config = {
      host: process.env["MYSQL_HOST"],
      user: process.env["MYSQL_USER"],
      password: process.env["MYSQL_PASSWORD"],
      database: process.env["MYSQL_DB"],
      port: 3306,
      ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") }
    };

    const conn = await mysql.createConnection(config);
    const [rows, fields] = await conn.execute(
      'INSERT INTO thread (thread_id, thread_name) VALUES (?, ?)',
      [threadInfo.thread_id, threadInfo.thread_name]
    );

    console.log('threadテーブルにデータを登録しました。');
  } catch (error) {
    // エラーが発生した場合の処理
    console.log('データベースへの登録中にエラーが発生しました:', error.message);
    throw error; // エラーを再スローして呼び出し元に伝える
  }
}

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    // 擬似データ生成
    const thread_id: number = Math.floor(Math.random() * 1000); // 0から999の間でランダムにthread_idを生成
    const thread_name: string = `Thread ${thread_id}`; // thread_idを含むスレッド名を生成

    // threadのテーブルにスレッド情報を登録
    const threadInfo: ThreadInfo = { thread_id, thread_name };
    await registerThread(threadInfo);

    // 入力完了を出力
    console.log('入力が完了しました。');
    context.res = {
      status: 200,
      body: "ok"
    };
  } catch (error) {
    // ハンドルされていないエラーをキャッチしてログに出力
    console.log('エラーが発生しました:', error.message);
    context.res = {
      status: 500,
      body: "Internal Server Error"
    };
  }
};

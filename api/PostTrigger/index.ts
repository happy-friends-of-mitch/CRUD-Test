import * as fs from 'fs';
import * as mysql from 'mysql2/promise';

interface MegaInfo {
    id: number;
    img_url: string;
    thread_id: number;
    reply_id: number;
  }
async function registerThread(MegaInfo: MegaInfo): Promise<void> {
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
      'INSERT INTO mega (id, img_url,reply_id,thread_id) VALUES (?, ?, ?, ?)',
      [MegaInfo.id, MegaInfo.img_url,MegaInfo.reply_id,MegaInfo.thread_id]
    );

    console.log('megaテーブルにデータを登録しました。');
  } catch (error) {
    // エラーが発生した場合の処理
    console.log('データベースへの登録中にエラーが発生しました:', error.message);
    throw error; // エラーを再スローして呼び出し元に伝える
  }
}

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    // // thread_idとthread_nameをリクエストボディから取得
    // const id: number = req.body.id;
    // const img_url: string = req.body.img_url;
    // const reply_id: number = req.body.reply_id;
    // const thread_id: number = req.body.thread_id;
    const id: number = Math.floor(Math.random() * 1000); // 0から999の間でランダムなidを生成
    const img_url: string = 'https://example.com/image.jpg'; // 仮の画像URL
    const reply_id: number = Math.floor(Math.random() * 1000); // 0から999の間でランダムなreply_idを生成
    const thread_id: number = Math.floor(Math.random() * 1000); // 0から999の間でランダムなthread_idを生成
    // megaのテーブルにスレッド情報を登録
    const megaInfo: MegaInfo = { id, img_url,reply_id , thread_id};
    await registerThread(megaInfo);

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

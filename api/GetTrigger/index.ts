module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
    const mysql2 = require('mysql2');
    const fs = require('fs');
    const mysql = require('mysql2/promise');


    var config =
    {
        host: process.env["MYSQL_HOST"],
        user: process.env["MYSQL_USER"],
        password: process.env["MYSQL_PASSWORD"],
        database: process.env["MYSQL_DB"],
        port: 3306,
        ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
    };
// thredテーブルからthred_idとthred_nameをJSONファイルとして出力
    const conn = await mysql.createConnection(config);
    const [rows, fields] = await conn.execute(
        'SELECT thred_id, thred_name FROM thred'
    );
    const thred = JSON.stringify(rows);
    fs.writeFileSync('thred.json', thred);
    context.log('thred.jsonにthredテーブルのデータを出力しました。');
//megaテーブルからimg_url,reply_id,thred_id,thredテーブルからthred_nameをJSONファイルとして出力
    const [rows2, fields2] = await conn.execute(
        'SELECT mega.img_url, mega.reply_id, mega.thred_id, thred.thred_name FROM mega INNER JOIN thred ON mega.thred_id = thred.thred_id'
    );
    const mega = JSON.stringify(rows2);
    fs.writeFileSync('mega.json', mega);
    context.log('mega.jsonにmegaテーブルのデータを出力しました。');
}

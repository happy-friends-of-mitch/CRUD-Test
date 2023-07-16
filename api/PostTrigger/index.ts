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
    const mysql = require('mysql2');
    const fs = require('fs');
    var config =
    {
        host: process.env["MYSQL_HOST"],
        user: process.env["MYSQL_USER"],
        password: process.env["MYSQL_PASSWORD"],
        database: process.env["MYSQL_DB"],
        port: 3306,
        ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
    };
    const conn = await mysql.createConnection(config);
    // thredのテーブルにthred_idとthred_nameを登録
    const [rows, fields] = await conn.execute(
        'INSERT INTO thred (thred_id, thred_name) VALUES (?, ?)',
        [req.body.thred_id, req.body.thred_name]
        );
    //megaテーブルにid,img_url,reply_id,thred_idを登録
    const [rows2, fields2] = await conn.execute(
        'INSERT INTO mega (id, img_url, reply_id, thred_id) VALUES (?, ?, ?, ?)',
        [req.body.id, req.body.img_url, req.body.reply_id, req.body.thred_id]
    );
}

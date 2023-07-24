# CRUD-Test
functionの部分を説明
blobとの接続は省く
```
cd api
npm install
```
```local.settings.json

{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "MYSQL_HOST":"",
    "MYSQL_USER":"",
    "MYSQL_PASSWORD":"",
    "MYSQL_DB":"",
    "AZURE_STORAGE_CONTAINER_NAME": "post-img-container"
  }
}
```


## 参考
[Node.jsのMySQLでAsync/Awaitで接続](https://blog.turai.work/entry/20200817/1597650222)
[【node.js】MySQL8.0に接続できない。Error: ER_NOT_SUPPORTED_AUTH_MODE](https://www.chuken-engineer.com/entry/2020/09/04/074216)
[Azure Functions Node.js 開発者ガイド](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-reference-node?
tabs=typescript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4)

[Azure Data Studio のダウンロードとインストール](https://learn.microsoft.com/ja-jp/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=ubuntu-install%2Cubuntu-uninstall)
[クイック スタート: Azure Data Studio を使用して、MySQL に接続し、クエリを実行する](https://learn.microsoft.com/ja-jp/sql/azure-data-studio/quickstart-mysql?view=sql-server-ver16)

## functionで関数がない理由
ー＞yamlを書き直さないと解決しない
functionが通らないのは，pathの置き方だめ
処理がapi直下なのにそういうふうになっていない
yamlはステップごとにpathを指定しないとだめ
それか一個あげる

# API設計書サンプル

## ファイル登録API

### 概要

ファイルを登録する

### パス

`/api/v1/register`


### バックエンド作成状況
<font color="LightSkyBlue">完成済</font>

### メソッド

- POST
  - JSON (Req/Res)

### パラメータ

|パラメータ名|型|内容|
|---|---|---|
|id|string|xxx ID|
|files|array|ファイルのオブジェクト|

#### ファイルオブジェクト

|パラメータ名|型|内容|
|---|---|---|
|filename|string|ファイル名|
|data|string|base64エンコードしたファイルの実体|

#### リクエストサンプル

```JSON
{
  "id": "1234567890abcedf"
  "files": [
    {
      "filename": "sample.txt",
      "data": "aGVsbG8gd29ybGQ="
    },
    {
      "filename": "test.txt",
      "data": "44GT44KT44Gr44Gh44Gv"
    }
  ]
}
```

### レスポンス

#### 成功時

- ステータスコード: 200

#### レスポンスオブジェクト

|パラメータ名|型|内容|
|---|---|---|
|code|number|コード|
|message|string|メッセージ|

#### レスポンスサンプル

```JSON
{
  "code": 0,
  "message": "OK"
}
```







## ファイル取得API

### 概要

ファイルを取得する

### パス

`/api/v1/get`


### バックエンド作成状況
<font color="Coral">未着手</font>

### メソッド

- GET
  - JSON (Req/Res)

### パラメータ

|パラメータ名|型|内容|
|---|---|---|
|id|string|xxx ID|
|files|array|ファイルのオブジェクト|

#### ファイルオブジェクト

|パラメータ名|型|内容|
|---|---|---|
|filename|string|ファイル名|
|data|string|base64エンコードしたファイルの実体|

#### リクエストサンプル

```JSON
{
  "id": "1234567890abcedf"
  "files": [
    {
      "filename": "sample.txt",
      "data": "aGVsbG8gd29ybGQ="
    },
    {
      "filename": "test.txt",
      "data": "44GT44KT44Gr44Gh44Gv"
    }
  ]
}
```

### レスポンス

#### 成功時

- ステータスコード: 200

#### レスポンスオブジェクト

|パラメータ名|型|内容|
|---|---|---|
|code|number|コード|
|message|string|メッセージ|

#### レスポンスサンプル

```JSON
{
  "code": 0,
  "message": "OK"
}
```



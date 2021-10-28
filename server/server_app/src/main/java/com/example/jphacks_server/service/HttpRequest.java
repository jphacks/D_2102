package com.example.jphacks_server.service;

import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpRequest {

//    private static Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("halnagoyha.ac.jp", 8080));
//    private static String proxySwitch = "0";



    public static String callPost() {

        HttpURLConnection con = null;
        StringBuffer result = new StringBuffer();
        String appKey = System.getenv("GOO_API_KEY");

        String strPostUrl = "https://labs.goo.ne.jp/api/textpair";


        try {

            URL url = new URL(strPostUrl);

            //プロキシの設定があったら
            //con = (HttpURLConnection) url.openConnection(proxy);
            con = (HttpURLConnection) url.openConnection();

            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("Accept-Language", "jp");
            con.setRequestProperty("Content-Type", "application/JSON; charset=utf-8");
            OutputStreamWriter out = new OutputStreamWriter(con.getOutputStream());
            String postParam = "{\"app_id\":\"" + appKey + "\", \"request_id\":\"record007\", \"text1\":\"高橋さんはアメリカに出張に行きました。\", \"text2\":\"山田さんはイギリスに留学している。\"}";
            System.out.println(postParam);
            out.write(postParam);

            out.close();
            con.connect();

            // HTTPレスポンスコード
            final int status = con.getResponseCode();

            if (status == HttpURLConnection.HTTP_OK) {
                // 通信に成功した
                // テキストを取得する
                final InputStream in = con.getInputStream();
                String encoding = con.getContentEncoding();
                if (null == encoding) {
                    encoding = "UTF-8";
                }

                final InputStreamReader inReader = new InputStreamReader(in, encoding);
                final BufferedReader bufReader = new BufferedReader(inReader);
                String line = null;
                // 1行ずつテキストを読み込む
                while ((line = bufReader.readLine()) != null) {
                    result.append(line);
                }
                bufReader.close();
                inReader.close();
                in.close();
            } else {
                System.out.println("error");
            }

        } catch (Exception e1) {
            e1.printStackTrace();
            System.out.println(e1);
        } finally {
            if (con != null) {
                // コネクションを切断
                con.disconnect();
            }
        }


        return result.toString();

    }


}

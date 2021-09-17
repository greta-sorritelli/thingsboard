HttpClient httpclient = new DefaultHttpClient();
HttpPost httpPost = new HttpPost(url);

FileBody uploadFilePart = new FileBody(uploadFile);
MultipartEntity reqEntity = new MultipartEntity();
reqEntity.addPart("upload-file", uploadFilePart);
httpPost.setEntity(reqEntity);

HttpResponse response = httpclient.execute(httpPost);
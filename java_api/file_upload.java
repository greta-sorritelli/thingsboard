// HttpClient httpclient = new DefaultHttpClient();
// HttpPost httpPost = new HttpPost(url);

// FileBody uploadFilePart = new FileBody(uploadFile);
// MultipartEntity reqEntity = new MultipartEntity();
// reqEntity.addPart("upload-file", uploadFilePart);
// httpPost.setEntity(reqEntity);

// HttpResponse response = httpclient.execute(httpPost);


import java.io.File;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.util.EntityUtils;


public class File_upload {
  public static void postImage(String filename) throws Exception {
    HttpClient httpclient = new DefaultHttpClient();
    httpclient.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);

    HttpPost httppost = new HttpPost("http://localhost:4200/assets");
    File file = new File(filename);

    MultipartEntity mpEntity = new MultipartEntity();
    ContentBody cbFile = new FileBody(file, "image/*");
    mpEntity.addPart("userfile", cbFile);

    httppost.setEntity(mpEntity);
    System.out.println("executing request " + httppost.getRequestLine());
    HttpResponse response = httpclient.execute(httppost);
    HttpEntity resEntity = response.getEntity();

    System.out.println(response.getStatusLine());
    if (resEntity != null) {
    System.out.println(EntityUtils.toString(resEntity));
    }
    if (resEntity != null) {
    resEntity.consumeContent();
    }

    httpclient.getConnectionManager().shutdown();
  }
}
package com.example.carpet;

import com.example.carpet.payloads.request.LoginReq;
import com.example.carpet.payloads.response.UserInfoRes;
import com.google.gson.Gson;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.ParameterType;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Assertions;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.HttpClientErrorException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;


public class StepDefs extends CarpetApplicationTests {
    private final String baseUrl = "http://localhost:9090";
    private final Logger logger = Logger.getLogger(String.valueOf(StepDefs.class));
    private String username;
    private String password;
    private HttpStatusCode lastStatusCode;
    private String lastResponse;
    private String lastRequest;
    private HttpURLConnection con;
    private String jwt;
    private String refreshToken;

    @Given("{string}|{string}")
    public void putUsernamePassword(String username, String password) {
        this.username = username;
        this.password = password;
        LoginReq loginReq = LoginReq.builder().username(username).password(password).build();
        Gson json = new Gson();
        lastRequest = json.toJson(loginReq);
    }

    @When("the client calls {string}")
    public void theClientCalls(String endpoint) {
        sendRequest(endpoint, "POST", lastRequest);
    }

    @Then("the client receives status code of {listOfIntegers}")
    public void theClientReceivesStatusCodeOf(List<Integer> statusCodes) {
        boolean inList = false;
        for (Integer statusCode : statusCodes) {
            inList = statusCode.equals(lastStatusCode.value()) || inList;
        }
        Assertions.assertTrue(inList);
    }

    @When("the client after auth {string} {string}")
    public void callAfterAuth(String type, String endpoint) throws IOException, URISyntaxException {
        if (endpoint.equalsIgnoreCase("/product/save"))
            sendImageProduct(endpoint);
        else
            sendRequest(endpoint, type, type.equals("GET") ? null : lastRequest);
    }

    private void sendImageProduct(String endpoint) throws IOException, URISyntaxException {
        HttpClient httpclient = new DefaultHttpClient();
        httpclient.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);

        HttpPost httppost = new HttpPost(baseUrl + endpoint);
        File file = new File(this.getClass().getResource("../../../image.png").toURI());

        MultipartEntity mpEntity = new MultipartEntity();
        ContentBody cbFile = new FileBody(file, "image/jpeg");

        FormBodyPart name = new FormBodyPart("name", new StringBody("Test"));
        FormBodyPart category = new FormBodyPart("category", new StringBody("Test"));
        FormBodyPart description = new FormBodyPart("description", new StringBody("Test"));
        FormBodyPart productUnit = new FormBodyPart("productUnit", new StringBody("kg"));
        FormBodyPart priceUnit = new FormBodyPart("priceUnit", new StringBody("nis"));
        FormBodyPart price = new FormBodyPart("price", new StringBody(Double.toString(10.0)));


        mpEntity.addPart("file", cbFile);
        mpEntity.addPart(name);
        mpEntity.addPart(category);
        mpEntity.addPart(description);
        mpEntity.addPart(productUnit);
        mpEntity.addPart(priceUnit);
        mpEntity.addPart(price);

        httppost.addHeader("Authorization", "Bearer " + jwt);
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

    private void sendRequest(String endpoint, String type, String jsonBody) {
        try {
            URL url = new URL(baseUrl + endpoint);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod(type);
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            if (jwt != null) {
                con.setRequestProperty("Authorization", "Bearer " + jwt);
            }
            con.setDoOutput(true);
            if (jsonBody != null && !jsonBody.isBlank()) {
                OutputStream outputStream = con.getOutputStream();
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                outputStream.write(input, 0, input.length);
                outputStream.close();
                con.getOutputStream();
            }
            lastStatusCode = HttpStatusCode.valueOf(con.getResponseCode());
            System.out.println(lastStatusCode);
            if (!lastStatusCode.isError()) {
                lastResponse = parseBody(con);
                con.getInputStream().close();
                logger.log(Level.INFO, lastResponse);
                if (jwt == null || refreshToken == null) {
                    parseTokens(lastResponse);
                    con.disconnect();
                }

            }

        } catch (IOException exception) {
            exception.printStackTrace();
        } catch (HttpClientErrorException.Unauthorized exception) {
            lastStatusCode = HttpStatusCode.valueOf(401);
            System.out.println(lastStatusCode);
        }
    }

    @ParameterType("\\[([0-9, ]*)\\]")
    public List<Integer> listOfIntegers(String integers) {
        return Arrays.stream(integers.split(", ?"))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

    @Given("request body")
    public void requestBody(DataTable body) {
        List<Map<String, String>> mapBody = body.asMaps(String.class, String.class);
        Map<String, String> types = mapBody.get(0);
        Map<String, String> objectBeforeCasting = mapBody.get(1);
        Map<String, Object> castedObjectsMap = new HashMap<String, Object>();
        for (String key :
                mapBody.get(0).keySet()) {
            if (types.get(key).equals("List")) {
                castedObjectsMap.put(key, Arrays.stream(objectBeforeCasting.get(key).split(",")).map(Integer::valueOf).collect(Collectors.toList()));
            } else if (types.get(key).equals("Integer")) {
                castedObjectsMap.put(key, Integer.parseInt(objectBeforeCasting.get(key)));
            } else if (types.get(key).equals("Double")) {
                castedObjectsMap.put(key, Double.valueOf(objectBeforeCasting.get(key)));
            } else {
                castedObjectsMap.put(key, objectBeforeCasting.get(key));
            }
        }
        Gson json = new Gson();
        lastRequest = json.toJson(castedObjectsMap);
    }

    private void parseTokens(String json) {
        Gson gson = new Gson();
        UserInfoRes userInfoRes = gson.fromJson(json, UserInfoRes.class);
        jwt = userInfoRes.getToken();
        refreshToken = userInfoRes.getRefreshToken();
    }

    private String parseBody(HttpURLConnection con) {
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line + "\n");
            }
            bufferedReader.close();
            return stringBuilder.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    @When("refreshToken")
    public void refreshtoken() {
        sendRequest("/api/auth/refreshtoken", "POST",
                "{" +
                        "\"refreshToken\":" + "\"" + refreshToken + "\"" +
                        "}"
        );
    }
}

#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "2G_Casa";  
const char *password = "240102509";

////////////////////////////////////////////////FUNÇÕES////////////////////////////////////////////////

void connectToWifi(){
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void enviarDataProServer(const String message){
  HTTPClient http;    //Declare object of class HTTPClient
  String postData;
  //Post Data
  postData = message;
  http.begin("http://camb-servidor.herokuapp.com/dados");
  http.addHeader("content-type", "application/json");
      
  int httpCode = http.POST(postData);   //Send the request
  String payload = http.getString();    //Get the response payload
  Serial.println("REALIZANDO POST");   
  Serial.println(httpCode);   //Print HTTP return code
  if(payload == ""){
    Serial.println("PAYLOAD VAZIO");
  }else{
    Serial.println(payload);    //Print request response payload  
  }    
  http.end();
}

//////////////////////////////////////////////////SETUP E LOOP////////////////////////////////////////

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  connectToWifi();
}
void loop() {  
  // put your main code here, to run repeatedly:
if(Serial.available()){
    String msg = "";
    while(Serial.available()){
      msg = Serial.readString();
    }
    Serial.println("\nDado RECEBIDO do Arduino:");
    Serial.print(msg);
    enviarDataProServer(msg);
  }
}

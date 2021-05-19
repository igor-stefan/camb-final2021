//libraries
#include <Sensor.h>
#define CD 15

//time
#define FOUR_H 14400000

//defining objects (sensors)
//constructor: pin,n_samples,a_eq,b_eq;
Sensor mq135(A1,10,127.0,-2.849);

unsigned long tempo = 0;
double ppm_co2 = 0.0, ugm3_co2 = 0.0;

StaticJsonDocument<400> doc;

void setup() {
  Serial.begin(115200);
  delay(10);
  mq135.make_setup("CO2",10, 10, 3.7);
  delay(10);
  tempo = millis();
 
}
void loop(){  
  ppm_co2 = mq135.take_ppm();
  ugm3_co2 =  ppm2ugm3(ppm_co2, "CO2");
  doc["ppm"] = ppm_co2;
  doc["ugm3"] = ugm3_co2;
  serializeJson(doc, Serial);
  doc.clear();
  Serial.print("\n");
  wait(8000);
}

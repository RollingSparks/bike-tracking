/**
 * Bike Tracking for the MakeZurich LoraWAN Hackathon
 * Feb 3-4 2017, Zurich (CH)
 * 
 * Matthias Diez <mdiez@gmail.com>
 * Kai Jauslin <kj@nextension.com>
 * Jan Meier <jan@meier.com>
 * 
 * uBlox GPS code base: see http://playground.arduino.cc/UBlox/GPS
 */
#include <NeoSWSerial.h>
#include <TinyGPS++.h>

// https://github.com/jpmeijers/RN2483-Arduino-Library
#include <rn2xx3.h>

#include "Globals.h"

NeoSWSerial gpsSerial(GPS_RX_PIN, GPS_TX_PIN);
NeoSWSerial loraSerial(RN2483_RX_PIN, RN2483_TX_PIN);

unsigned long time = 0;
unsigned long timeInitialized = 0;
unsigned long timeTestSent = 0;
unsigned long timeAccelRead = 0;

#define STRBUF_SIZE 100
char strbuf[STRBUF_SIZE];
uint8_t stridx = 0;
bool hasFix = false;
TinyGPSPlus gps;

// transmission buffer
uint8_t coords[6];

static const rn2xx3 lora(loraSerial);
float float_latitude;
float float_longitude;

void setup() {
  // initialize timers
  time = millis();

  // initialize debug out
  Serial.begin(57600);
  delay(1000);
  
  led_on();
  
  Serial.println(F("Initializing RN2483"));
  setup_lora();
  Serial.println(F("Initializing GPS"));
  //setup_gps();  

  accel_init();
  led_off();
  timeInitialized = millis();

  gpsSerial.listen();
}

void loop() {
  uint8_t result = 0;
  
//  // read nmea string if available
//  while (gpsSerial.available()) {
//    strbuf[stridx] = gpsSerial.read();
//    if (strbuf[stridx] == '$') {
//      stridx = 0;
//      strbuf[0] = '$';
//    }
//    
////    Serial.write(strbuf[stridx]);
//    
//    if (strbuf[stridx] == '\n') {      
//      strbuf[stridx] = 0;
//      stridx = 0;
//
//      Serial.print("> GPS strbuf=");
//      Serial.println(strbuf);
// 
////      strcpy(strbuf, "$GPGGA,170844.50,4738.5787,N,00852.1113,E,1,03,3.46,421.8,M,47.3,M,,*52");
//      //strcpy(strbuf, "$GPGGA,175633.25,,,,,0,03,38.85,,,,,,*61");
//      //strcpy(strbuf, "$GPGGA,184250.00,,,,,0,00,99.99,,,,,,*6C");
//      //strcpy(strbuf, "$GPGGA,193931.50,,,,,0,00,99.99,,,,,,0000*63");
//      
//      result = process_nmea(strbuf);
//      strbuf[0] = 0;
//    } else {
//      stridx = (stridx + 1) % (STRBUF_SIZE - 1);
//    }
//    
//    //Serial.print(strlen(strbuf));
//  }

  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }
  if (gps.location.isUpdated()) {
    double lat = gps.location.lat();
    double lng = gps.location.lng();
    Serial.print("lat="); Serial.println(lat);
    Serial.print("lng="); Serial.println(lng);

    // see https://www.thethingsnetwork.org/forum/t/best-practices-when-sending-gps-location-data/1242/12 
    int32_t ilat = (float)lat * 10000;
    int32_t ilng = (float)lng * 10000;
    // Pad 2 int32_t to 6 8uint_t, skipping the last byte (x >> 24)
    coords[0] = ilat;
    coords[1] = ilat >> 8;
    coords[2] = ilat >> 16;
    coords[3] = ilng;
    coords[4] = ilng >> 8;
    coords[5] = ilng >> 16;
  }
  
  if (millis() - timeTestSent > LORA_SEND_PERIOD) {
    Serial.print(F("[LORA] sending> "));
    Serial.print(coords[0]);
    loraSerial.listen();
    lora.txBytes(coords, sizeof(coords));
    gpsSerial.listen();
    timeTestSent = millis();
  }
 
}

//void send_update(TinyGPSPlus& gps) {
//  lora_send("{\"l\":{\"lat\":"+String(gps.location.lat())+", \"lng\":"+gps.location.lng()+"}}");
//}

//bool process_nmea(char *buf) {
//  char sep[2] = ",";
//  byte checksum = 0;
//  byte checksum_test = 0;
//
////  Serial.print(strlen(buf));
//  while (strlen(buf) > 1 && (buf[strlen(buf)-1] == ' ' || buf[strlen(buf)-1] == '\n' || buf[strlen(buf)-1] == '\r')) {
//    buf[strlen(buf)-1] = 0;
//  }
//  
//  // check if gps data is valid
////  Serial.print("- using buffer len: ");
////  Serial.println(strlen(buf));
//  
//  if (strlen(buf) > 4 && strlen(buf) < 74) {
//    for (uint8_t i=1; i<strlen(buf)-3; i++) {
////      Serial.print(">"); Serial.print(buf[i]);
//      checksum ^= buf[i];
//    }
//
//    // not very elegant, but short ;-)
////    Serial.print(buf[strlen(buf)-2]);
////    Serial.print(buf[strlen(buf)-1]);
////    Serial.print("<");
//    
//    checksum_test = buf[strlen(buf)-2] >= 65 ? (buf[strlen(buf)-2]-55)*16 : (buf[strlen(buf)-2]-48)*16;
////    Serial.print(String(checksum_test));
//    checksum_test += buf[strlen(buf)-1] >= 65 ? (buf[strlen(buf)-1]-55) : (buf[strlen(buf)-1]-48);
//    
////    Serial.print("CHECKSUM_TEST=");
////    Serial.println(String(checksum_test[0]));
//  } else {
//    // invalid data
//    Serial.print(F("INVALID DATA: "));
//    Serial.println(buf);
//    return false;
//  }
//
//  if (checksum_test != checksum) {
//    Serial.print(F("INVALID CHECKSUM: "));
//    Serial.println(buf);
//    return false;
//  }
//  
////  Serial.print("checksum=");
////  Serial.print(String(checksum));
////  Serial.print(" ?= ");
////  Serial.print(String(checksum_test));
////  Serial.print(" ");
////  Serial.print(buf[strlen(buf)-2]);
////  Serial.print(buf[strlen(buf)-1]);
////  return;
//
//  char *token = strtok_single(buf, sep);
//  
//  while( token != NULL ) 
//  {
////    Serial.print("token = ");
////    Serial.println(token);
//    
//    if (strcmp(token, "$GPGGA")) {
////token = $GPGGA
////token = 134533.25
////token = 
////token = 
////token = 
////token = 
////token = 0
////token = 03
////token = 7.28
////token = 
////token = 
////token = 
////token = 
////token = 
////token = *5C
//
////      strcat(cmd, "{\"gps\":{");
//      
//      // time
////      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"t\":");
////      strcat(cmd, token);
////      strcat(cmd, ",");
//
//      // lat
//      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"lat\":\"");
////      strcat(cmd, strcmp(token,"")==0 ? "0" : token);
////token="47.1234";
//      float_latitude = String(token).toFloat();
////      float_latitude = 4723.10;
////      Serial.print("lat:"); Serial.println(String(float_latitude));
//      
//      if (strcmp(token,"")==0) {
//        hasFix = false;
//      } else {
//        hasFix = true;
//      }
//
//      // N,S
//      token = strtok_single(NULL, sep);
////      if (strcmp(token, "")!=0) {
////        strcat(cmd, token);
////      }
////      strcat(cmd, "\",");
//      
//      // lon
//      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"lon\":\"");
////      strcat(cmd, strcmp(token,"")==0 ? "0" : token);
//
//      float_longitude = String(token).toFloat();
////    Serial.print("lat:"); Serial.println(token);
//      
//      // W,E
//      token = strtok_single(NULL, sep);
////      if (strcmp(token, "")!=0) {
////        strcat(cmd, token);
////      }
////      strcat(cmd, "\",");
//      
//      // fix quality
//      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"q\":");
////      strcat(cmd, strcmp(token,"")==0 ? "0" : token);
////      strcat(cmd, ",");
//
//       // number of satellites
//      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"n\":");
////      strcat(cmd, strcmp(token,"")==0 ? "0" : token);
////      strcat(cmd, ",");
//
//      // skip
//      token = strtok_single(NULL, sep);
//      
//      // altitude    
//      token = strtok_single(NULL, sep);
////      strcat(cmd, "\"alt\":");
////      strcat(cmd, strcmp(token,"")==0 ? "0" : token);
//      
////      cmd.concat(",");
//
//      // skip
//      token = strtok_single(NULL, sep);
//      token = strtok_single(NULL, sep);
//      token = strtok_single(NULL, sep);
//      token = strtok_single(NULL, sep);
//
//      // checksum (maybe later ;-) 
//      token = strtok_single(NULL, sep);
//      
////      strcat(cmd, "}}");   
//
//      // see https://www.thethingsnetwork.org/forum/t/best-practices-when-sending-gps-location-data/1242/12 
//      int32_t lat = float_latitude * 100;
//      int32_t lon = float_longitude * 100;
//      // Pad 2 int32_t to 6 8uint_t, skipping the last byte (x >> 24)
//      coords[0] = lat;
//      coords[1] = lat >> 8;
//      coords[2] = lat >> 16;
//      coords[3] = lon;
//      coords[4] = lon >> 8;
//      coords[5] = lon >> 16;
//
//      break;   
//    } else {
//      token = strtok_single(NULL, sep);
//    }
//  }  
//  
//  return true;
//}

void send_test(char *json) {
  Serial.println(F("set listen to loraSerial"));
  loraSerial.listen();
  Serial.println(F("sending:"));
  Serial.println(json);
  lora_send(json);
  //lora_send("X");
  Serial.println(F("finished sending"));
  gpsSerial.listen();
}

void setup_gps() {
  gpsSerial.begin(9600); 
  configureUblox(settingsArray); 
}

void led_on()
{
  digitalWrite(DEBUG_LED_PIN, 1);
}

void led_off()
{
  digitalWrite(DEBUG_LED_PIN, 0);
}

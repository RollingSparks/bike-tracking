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
#include "TinyGPS++.h"

// https://github.com/jpmeijers/RN2483-Arduino-Library
#include <rn2xx3.h>

#include "Globals.h"

NeoSWSerial gps_port(8,9);
NeoSWSerial loraSerial(RN2483_RX_PIN, RN2483_TX_PIN);

unsigned long time = 0;
static rn2xx3 lora(loraSerial);
TinyGPSPlus gps;
  
void setup() {
  Serial.begin(57600);
  gps_port.begin(9600); 
  
  delay(1000);

  led_on();
  //setup_lora();
  setup_gps();
  led_off();
  
  delay(2000);
}

void loop() {
  //lora_send("X");
  
  //Serial.print(".");
  while (gps_port.available()) {
     gps.encode(gps_port.read());
  }
  if (gps.location.isUpdated()) {
    Serial.print("LAT="); Serial.print(gps.location.lat(), 6);
    Serial.print("LNG="); Serial.println(gps.location.lng(), 6);
  }

}

void setup_gps() {
  byte settingsArray[] = { 0x00, 0xFA, 0x00, 0x80, 0x25, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }; 
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

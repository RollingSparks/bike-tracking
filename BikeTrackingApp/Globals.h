// debug led pin
#define DEBUG_LED_PIN 13

// lora RN2483 pins
#define RN2483_RESET_PIN 2
#define RN2483_TX_PIN 12
#define RN2483_RX_PIN 13

// ublox pam-7q gps pins
#define GPS_TX_PIN 6
#define GPS_RX_PIN 5
#define GPS_VIN_PIN -1

TX_RETURN_TYPE lora_send(char *str, bool useConfirmation = false);

#define LORA_SEND_PERIOD 10000
#define ACCEL_READ_PERIOD 500

#define USE_GPS_TEST 1

// TTN settings
const char TTN_APP_EUI[] = "26011871";
const char TTN_APP_ID[] = "93906F9F53BD6387F7E4A51CA6AFFB08";
const char TTN_APP_KEY[] = "FA3E8CB92A0085933CB0924D2F158C86";

const byte settingsArray[] = { 0x00, 0xFA, 0x00, 0x80, 0x25, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }; 

// accelerometer
#define ACCEL_X_PIN A0
#define ACCEL_Y_PIN A1
#define ACCEL_Z_PIN A2
#define ACCEL_POWER_PIN 10
#define ACCEL_MAX_VAL 1023
#define ACCEL_POWER_MAX 3300
#define ACCEL_POWER_ACTUAL 3230



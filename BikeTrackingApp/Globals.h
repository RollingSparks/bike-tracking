// debug led pin
#define DEBUG_LED_PIN 13

// lora RN2483 pins
#define RN2483_RESET_PIN 2
#define RN2483_TX_PIN 7
#define RN2483_RX_PIN 6

// ublox pam-7q gps pins
#define GPS_TX_PIN 8
#define GPS_RX_PIN 9
#define GPS_VIN_PIN -1

// TTN settings
static const char TTN_APP_EUI[] = "26011871";
static const char TTN_APP_ID[] = "93906F9F53BD6387F7E4A51CA6AFFB08";
static const char TTN_APP_KEY[] = "FA3E8CB92A0085933CB0924D2F158C86";

TX_RETURN_TYPE lora_send(String str, bool useConfirmation = false);

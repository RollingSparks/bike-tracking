
TX_RETURN_TYPE lora_send(String str, bool useConfirmation = false)
{
  TX_RETURN_TYPE retval = 0;

  led_on();
  if (!useConfirmation) {
    retval = lora.txUncnf(str);
    Serial.println(str);  
    Serial.println(retval);
  } else {
    retval = lora.txCnf(str);
  }
  led_off();
  
  return retval;
}

void setup_lora() 
{
  loraSerial.begin(9600);
  Serial.println("Startup RN2483");

  reset_rn2483();
  lora.autobaud();

  Serial.println("When using OTAA, register this DevEUI: ");
  Serial.println(lora.hweui());
  Serial.print("RN2483 version number: ");
  Serial.println(lora.sysver());

  //myLora.setFrequencyPlan(FREQ_PLAN::SINGLE_CHANNEL_EU);
  lora.initABP(TTN_APP_EUI, TTN_APP_ID, TTN_APP_KEY);
}

void reset_rn2483() 
{
  pinMode(RN2483_RESET_PIN, OUTPUT);
  digitalWrite(RN2483_RESET_PIN, LOW);
  delay(500);
  digitalWrite(RN2483_RESET_PIN, HIGH);
}


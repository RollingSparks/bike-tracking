int accel_data[3];
int accel_prev[3];
float accel_mv[3];

void accel_init() {
  accel_data[0] = 0;
  accel_data[1] = 0;
  accel_data[2] = 0;
  pinMode(ACCEL_X_PIN, INPUT);
  pinMode(ACCEL_Y_PIN, INPUT);
  pinMode(ACCEL_Z_PIN, INPUT);
}

void accel_up() {
  pinMode(ACCEL_POWER_PIN, OUTPUT);
  digitalWrite(ACCEL_POWER_PIN, HIGH);
}

void accel_down() {
  pinMode(ACCEL_POWER_PIN, OUTPUT);
  digitalWrite(ACCEL_POWER_PIN, LOW);
}

void accel_save_prev() {
  accel_prev[0] = accel_data[0];
  accel_prev[1] = accel_data[1];
  accel_prev[2] = accel_data[2];
}

int accel_diff() {
  return (accel_data[0] - accel_prev[0]) + (accel_data[1] - accel_prev[1]) + (accel_data[2] - accel_prev[2]);
}

void accel_read_single() {
  accel_data[0] = analogRead(ACCEL_X_PIN);
  accel_data[1] = analogRead(ACCEL_Y_PIN);
  accel_data[2] = analogRead(ACCEL_Z_PIN);
  accel_mv[0] = (float)accel_data[0] * ((float)ACCEL_MAX_VAL / ACCEL_POWER_MAX);
  accel_mv[1] = (float)accel_data[1] * ((float)ACCEL_MAX_VAL / ACCEL_POWER_MAX);
  accel_mv[2] = (float)accel_data[2] * ((float)ACCEL_MAX_VAL / ACCEL_POWER_MAX);
  Serial.print(accel_mv[0]); Serial.print("\t");
  Serial.print(accel_mv[1]); Serial.print("\t");
  Serial.print(accel_mv[2]); Serial.println("\t");
}

void accel_read_multi(uint8_t n = 10) {
  float alpha = 0.95;
  
  for (uint8_t i=0; i<n; i++) {
    accel_data[0] = (float)accel_data[0] * alpha + (1-alpha) * (float)analogRead(ACCEL_X_PIN);
    accel_data[1] = (float)accel_data[0] * alpha + (1-alpha) * (float)analogRead(ACCEL_Y_PIN);
    accel_data[2] = (float)accel_data[0] * alpha + (1-alpha) * (float)analogRead(ACCEL_Z_PIN);
  }
}


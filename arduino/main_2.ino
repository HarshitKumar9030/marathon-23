#include <SoftwareSerial.h>
#include <TinyGPS++.h>

TinyGPSPlus gps;
SoftwareSerial serial(2, 3); // RX, TX

void setup() {
  Serial.begin(9600);
  serial.begin(9600);
}

void loop() {
  while (serial.available() > 0) {
    if (gps.encode(serial.read())) {
      if (gps.location.isValid()) {
        Serial.print(gps.location.lat(), 6);
        Serial.print(",");
        Serial.println(gps.location.lng(), 6);
      }
    }
  }
}

#include <SoftwareSerial.h>

SoftwareSerial gpsSerial(2, 3); // RX, TX for GPS module

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
}

void loop() {
  // Read data from the GPS module
  String gpsData = "";
  while (gpsSerial.available() > 0) {
    char c = gpsSerial.read();
    gpsData += c;
  }

  // Parse GPS data to extract latitude and longitude
  float latitude, longitude;
  if (gpsData.startsWith("$GPGGA")) {
    int comma1 = gpsData.indexOf(",");
    int comma2 = gpsData.indexOf(",", comma1 + 1);
    int comma3 = gpsData.indexOf(",", comma2 + 1);
    int comma4 = gpsData.indexOf(",", comma3 + 1);
    int comma5 = gpsData.indexOf(",", comma4 + 1);
    int comma6 = gpsData.indexOf(",", comma5 + 1);
    int comma7 = gpsData.indexOf(",", comma6 + 1);

    if (comma7 - comma6 > 1) {
      latitude = gpsData.substring(comma3 + 1, comma4).toFloat() / 100.0;
      latitude += gpsData.substring(comma4 + 1, comma6).toFloat() / 60.0;

      if (gpsData.charAt(comma5 + 1) == 'S') {
        latitude = -latitude;
      }
    }

    if (comma7 < gpsData.length() - 1) {
      longitude = gpsData.substring(comma7 + 1, comma7 + 3).toFloat() + gpsData.substring(comma5 + 1, comma6).toFloat() / 60.0;
      longitude += gpsData.substring(comma6 + 1, comma7).toFloat() / 100.0;

      if (gpsData.charAt(comma7 + 3) == 'W') {
        longitude = -longitude;
      }
    }

    // Send location data to Raspberry Pi using serial communication
    Serial.print("Location,");
    Serial.print(latitude, 6);
    Serial.print(",");
    Serial.println(longitude, 6);
  }

  delay(5000);
}

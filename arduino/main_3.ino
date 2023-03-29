#include <SoftwareSerial.h>

SoftwareSerial gpsSerial(3, 4); // RX, TX

void setup()
{
  Serial.begin(9600);
  gpsSerial.begin(9600);
}

void loop()
{
  if (gpsSerial.available() > 0)
  {
    String data = gpsSerial.readStringUntil('\n');
    Serial.println(data);
  }
}

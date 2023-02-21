# Raspberry Pi - Arduino GPS Tracker
- This project uses a Raspberry Pi and an Arduino to create a GPS tracker that reads location data from a GPS  module connected to the Arduino, and stores the data in a MongoDB database running on the Raspberry Pi.

# Requirements
- To run this project, you'll need the following hardware and software:

- Raspberry Pi (any model)
- Arduino Uno or similar
- GPS module (such as the Ublox NEO-6M)
- Jumper wires
- USB cable to connect the Arduino to the Raspberry Pi
- Python 3.x
- PyMongo library (for Python)
- Arduino IDE (for uploading the Arduino sketch)
- Installation
- Connect the GPS module to the Arduino using jumper wires. The GPS module should be connected to the Arduino's - RX and TX pins.
- Connect the Arduino to the Raspberry Pi using a USB cable.
- Install the PyMongo library by running the following command in a terminal on the Raspberry Pi:
- Copy code
- pip install pymongo
- Upload the arduino_gps.ino sketch to the Arduino using the Arduino IDE. This sketch reads GPS data from the - module and sends it to the Raspberry Pi via serial communication.
- Run the gps_tracker.py script on the Raspberry Pi using Python 3.x
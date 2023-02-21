import serial
from pymongo import MongoClient

ser = serial.Serial('/dev/ttyACM0', 9600) # Replace '/dev/ttyACM0' with the appropriate port name for your Arduino

# Connect to MongoDB database
client = MongoClient('localhost', 27017)
db = client['gps_data']
collection = db['locations']

while True:
    data = ser.readline().decode().strip() # Read data from serial port and decode it
    if data:
        # Parse GPS data
        gps_data = data.split(',')
        latitude = float(gps_data[0])
        longitude = float(gps_data[1])
        timestamp = gps_data[2]

        # Insert GPS data into MongoDB collection
        location = {
            'latitude': latitude,
            'longitude': longitude,
            'timestamp': timestamp
        }
        collection.insert_one(location)

        print('GPS data stored in MongoDB:', location)

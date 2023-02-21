#!/bin/bash

mongo mongodb://localhost/mydb <<EOF

use mycollection

latest_location=$(mongo mycollection --quiet --eval 'db.locations.find().sort({$natural:-1}).limit(1)' | sed 's/.*_id" : //; s/ },.*//')

# Extract the latitude and longitude values from the location document
latitude=$(echo $latest_location | jq -r '.latitude')
longitude=$(echo $latest_location | jq -r '.longitude')

# Print the latitude and longitude values
echo "Latest location: $latitude, $longitude"

EOF

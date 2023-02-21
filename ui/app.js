const YOUR_INITIAL_LATITUDE = 51.505;
const YOUR_INITIAL_LONGITUDE = -0.09;

const map = L.map("map").setView(
  [YOUR_INITIAL_LATITUDE, YOUR_INITIAL_LONGITUDE],
  15
);

const marker = L.marker([YOUR_INITIAL_LATITUDE, YOUR_INITIAL_LONGITUDE]).addTo(
  map
);

setInterval(() => {
  fetch("http://localhost:3000/location", {
    method: "GET",
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Updating the marker position to represent the new location
      marker.setLatLng([data.latitude, data.longitude]);

      // Centering the map on the new location
      map.setView([data.latitude, data.longitude], 15);

      const coordinates = document.getElementById("coordinates");
      coordinates.innerHTML = `Latitude: ${data.latitude.toFixed(
        6
      )}, Longitude: ${data.longitude.toFixed(6)}`;
    })
    .catch((error) => {
      console.log(error);
    });

  const seconds = 5;
  for (let i = seconds; i >= 0; i--) {
    setTimeout(function () {
        let dots = "...";
        if(i === 5){
            dots = "";
        }
        if(i === 4){
            dots = ".";
        }
        if(i === 3){
            dots = "..";
        }
        if(i === 2){
            dots = "...";
        }
        if(i === 1){
            dots = "....";
        }
      document.getElementById("secs").innerHTML = i === 0 ? "5" : i + dots;

    }, (seconds - i) * 1000);
  }
}, 5000);

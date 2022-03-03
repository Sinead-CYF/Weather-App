window.addEventListener("load", () => {
  //GLOBAL ELEMENTS
  let long;
  let lat;
  let timezone = document.querySelector(`.location`);
  let icon = document.querySelector(`.main-icon`);
  let temp = document.querySelector(`.temperature`);
  let text = document.querySelector(`.description`);
  const tempSection = document.querySelector(`.temp-section`);
  let tempSpan = document.querySelector(`.temp-section span`);
  let windSpeed = document.querySelector(`.wind-speed`);
  let humidity = document.querySelector(`.humidity`);


  //RETRIEVE LOCATION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let api = `https://api.weatherapi.com/v1/current.json?key=660691ec52844cea80e195345210611&q=${lat},${long}`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          //UPDATE DOM ELEMENTS
          timezone.textContent = data.location.region;
          temp.textContent = data.current.temp_c;
          text.textContent = data.current.condition.text;
          icon.src = data.current.condition.icon;
          windSpeed.textContent = data.current.wind_mph;
          humidity.textContent = data.current.humidity;

          //CHANGE TEMP UNITS
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "C") {
              tempSpan.textContent = "F";
              temp.textContent = data.current.temp_f;
            } else {
              tempSpan.textContent = "C";
              temp.textContent = data.current.temp_c;
            }
          });
        })
        .catch((error) => console.log(`Error encountered: ${error}`));
    });
  } else {
    h1.textContent = "Enable geolocation for current location";
  }
});

window.addEventListener("load", () => {
  //GLOBAL ELEMENTS
  let long;
  let lat;
  let timezone = document.querySelector(`.timezone`);
  let icon = document.querySelector(`.icon`);
  let temp = document.querySelector(`.temperature`);
  let text = document.querySelector(`.description`);
  const tempSection = document.querySelector(`.temp-section`);
  let tempSpan = document.querySelector(`.temp-section span`);
  console.log(tempSpan);

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
          timezone.textContent = data.location.tz_id;
          temp.textContent = data.current.temp_c;
          text.textContent = data.current.condition.text;
          icon.src = data.current.condition.icon;

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

window.addEventListener("load", () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=fe41a3034d094dd7f7b760dc53a523e0`;

        fetch(api)
        .then(weather => {
          return weather.json();
        }).then(displayResults);
      })

      function displayResults (weather) {
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);

        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = weather.weather[0].main;

        let hilow = document.querySelector('.hi-low');
        hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

      function dateBuilder (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
      }
    };
  }
});

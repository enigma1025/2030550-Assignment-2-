document.getElementById("searchButton").addEventListener("click", function () {
    var countryName = document.getElementById("searchInput").value;
    fetch(`https://restcountries.com/v3/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        displayCountryData(data);
      })
  });
  
  function displayCountryData(data) {
    var countryContainer = document.getElementById("countryData");
    countryContainer.innerHTML = "";
  
    data.forEach((country) => {
      var countryDetails = document.createElement("div");
      countryDetails.classList.add("country-card");
      countryDetails.innerHTML = `
                <h1>${country.name.common}</h1>
                <p>Capital: ${country.capital}</p>
                <button class="details-button"  data-country="${country.name.common}">More Details</button>
                <div class="additional-details" style="display: none;">
                    <p>Flag: <img src="${country.flags[0]}" alt="${country.name.common}" style="width: 40px;"></p>
                    <p>Population: ${country.population}</p>
                    <p>Continent: ${country.continents}</p>
                    <p>Area: ${country.area}</p>
                    <p class="weather-info">Weather: </p>
                </div>
            `;
      countryContainer.appendChild(countryDetails);
    });
  
    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", function () {
        var detailsSection = this.nextElementSibling;
        if (detailsSection.style.display === "none") {
          detailsSection.style.display = "block";
          var countryName = this.getAttribute("data-country");
          fetchWeatherData(
            countryName,
            detailsSection.querySelector(".weather-info")
          );
        } else {
          detailsSection.style.display = "none";
        }
      });
    });
  }
  
  function fetchWeatherData(countryName, weatherInfoElement) {
    var api_key = "b82d344eac4d4818aac125813242803&q";
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${api_key}=${countryName}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.current && data.current.temp_c) {
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        weatherInfoElement.innerHTML = `Temperature: ${temperature}°C <br> Condition: ${condition}`;
      } else {
        weatherInfoElement.textContent = "Weather data not available.";
      }
    })
    
  }
  
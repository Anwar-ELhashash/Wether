// =================== Html Selectors ===================
let barsIcon = document.getElementById("barsIcon");
let navigationContainer = document.getElementById("navigationContainer");
let searchField = document.getElementById("searchField");
let searchBtn = document.getElementById("searchBtn");
let today = document.getElementById("today");
let tomorrow = document.getElementById("tomorrow");
let dayAfterTomorrow = document.getElementById("dayAfterTomorrow");

// =================== functions ===================
// Know The Day
function getDay(dayIndex) {
  switch (dayIndex) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

// Know The Month
function getMonth(monthIndex) {
  switch (monthIndex) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

// =================== Fetch API ===================
async function wether(link) {
  let response = await fetch(link);
  let responseData = await response.json();
  let currentDay = responseData.forecast.forecastday[0];
  let date = new Date(currentDay.date);
  let day = date.getDay();

  //       ********** Today **********
  today.children[0].children[0].textContent = getDay(day);
  today.children[0].children[1].textContent = `${currentDay.date.slice(-2)} ${getMonth(
    date.getMonth()
  )}`;
  today.children[1].children[0].textContent = responseData.location.name;
  today.children[1].children[1].children[0].children[0].textContent = responseData.current.temp_c;
  today.children[1].children[1].children[1].children[0].setAttribute(
    "src",
    responseData.current.condition.icon
  );
  today.children[1].children[2].textContent = responseData.current.condition.text;

  //       ********** Tomorrow **********
  tomorrow.children[0].children[0].textContent = getDay(day + 1);
  tomorrow.children[1].children[0].setAttribute(
    "src",
    responseData.forecast.forecastday[1].day.condition.icon
  );
  tomorrow.children[1].children[1].children[0].textContent =
    responseData.forecast.forecastday[1].day.maxtemp_c;
  tomorrow.children[1].children[2].children[0].textContent =
    responseData.forecast.forecastday[1].day.mintemp_c;
  tomorrow.children[1].children[3].textContent =
    responseData.forecast.forecastday[1].day.condition.text;

  //       ********** Day After Tomorrow **********
  dayAfterTomorrow.children[0].children[0].textContent = getDay(day + 2);
  dayAfterTomorrow.children[1].children[0].setAttribute(
    "src",
    responseData.forecast.forecastday[2].day.condition.icon
  );
  dayAfterTomorrow.children[1].children[1].children[0].textContent =
    responseData.forecast.forecastday[2].day.maxtemp_c;
  dayAfterTomorrow.children[1].children[2].children[0].textContent =
    responseData.forecast.forecastday[2].day.mintemp_c;
  dayAfterTomorrow.children[1].children[3].textContent =
    responseData.forecast.forecastday[2].day.condition.text;
}

// =================== Events ===================
barsIcon.addEventListener("click", () => {
  navigationContainer.classList.toggle("d-block");
});

window.addEventListener("load", function () {
  wether(
    `https://api.weatherapi.com/v1/forecast.json?key=0db68fab22114f7f96c114138252504&q=cairo&days=3`
  );
});

searchField.addEventListener("input", function () {
  wether(
    `https://api.weatherapi.com/v1/forecast.json?key=0db68fab22114f7f96c114138252504&q=${searchField.value}&days=3`
  );
});

searchBtn.addEventListener("click", function () {
  wether(
    `https://api.weatherapi.com/v1/forecast.json?key=0db68fab22114f7f96c114138252504&q=${searchField.value}&days=3`
  );
});

// this method will be called later to: select the "locations" ul,
// then for every location in some "locations" array that is passed
// append that location string to the DOM in an li tag
let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')
  let listItems = " "

  locations.forEach(location => {
    listItems += `<li>${location.city}, ${location.country}</li>`
  })
  locationList.innerHTML = listItems
}

let fetchLocations = async () => {
    // our code here
}

let postLocation = async (event) => {
  // NOTE: added async

  // ooooh what does this all do?
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  // ---------
  // fetch code here
}

console.log("running JS code")
fetchLocations()
console.log("Fetch complete")

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)

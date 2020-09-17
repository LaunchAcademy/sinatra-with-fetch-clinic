// this method will be called later to: select the "locations" ul,
// then for every location in some "locations" array that is passed
// append that location string to the DOM in an li tag
let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')

  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let fetchLocations = () => {
  fetch("/locations.json")
  .then((responseObject) => {
    if (responseObject.ok) {
      return responseObject.json()
    } else {
      // throw error
    }
  })
  .then((response) => {
    let locations = response.locations
    appendLocationsArrayToHtml(locations)
    // appendLocationsArrayToHtml(response.locations)
  })
}

let postLocation = (event) => {
  // ooooh what does this all do?
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')
  // debugger

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  // ---------
  // fetch code here
  fetch("/locations.json", {
    method: "POST",
    body: JSON.stringify(newLocation)
  })
  .then((response) => {
    return response.json()
  })
  .then((response) => {
    // debugger
    let locations = response.locations
    appendLocationsArrayToHtml(locations)
  })
 }

console.log("running JS code ")
fetchLocations()
console.log("Fetch complete")

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)

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
  try {
    const response = await fetch("/api/v1/locations.json")
    if(!response.ok) {
      const errorMessage = `${response.status} ${response.statusText}`
      throw(errorMessage)
    }
    const data = await response.json()
    appendLocationsArrayToHtml(data.locations)
  } catch(err) {
    console.error("Error in fetch!")
    console.error(err)
    document.getElementById("error").innerHTML = "There was a problem fetching the data"
  }
}

let postLocation = async (event) => {
  // NOTE: added async

  // ooooh what does this all do?
  event.preventDefault()
  console.log("IT SUBMITTED")

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  console.log(newLocation)

  try {
    const response = await fetch("/api/v1/locations.json", {
      method: "post",
      body: JSON.stringify(newLocation),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(!response.ok) {
      const errorMessage = `${response.status} ${response.statusText}`
      throw(errorMessage)
    }
    const data = await response.json()
    appendLocationsArrayToHtml(data.locations)
  } catch(err) {
    console.error("Error in post fetch")
    console.error(err)
    document.getElementById("error").innerHTML += "Error persisting the location"
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

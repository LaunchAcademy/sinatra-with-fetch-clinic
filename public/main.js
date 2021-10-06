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
    // NOTE: added async

    // our code here
  // try {
    const response = await fetch("/api/v1/locations")
    // if (!response.ok) {
    //   const errorMessage = `${response.status} (${response.statusText})`
    //   error = new Error (errorMessage)
    //   throw error 
    // }
    const responseBody = await response.json()
    const locations = responseBody.locations
    appendLocationsArrayToHtml(locations)
  // } catch (error) {
  //   console.error(`Error in fetch: ${error.message}`)
  // }
}

let postLocation = async (event) => {
  // NOTE: added async

  // ooooh what does this all do?
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')
  // debugger
  // cityInputField.value
  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  // ---------
  // fetch code here
  try {
    const response = await fetch("/api/v1/locations", {
      //options object
      method: "POST",
      body: JSON.stringify(newLocation)
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      error = new Error(errorMessage)
      throw error
      // skip to catch
    }
    const responseBody = await response.json()
    appendLocationsArrayToHtml(responseBody.locations)
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

console.log("running JS code")
fetchLocations()
console.log("Fetch complete")

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)

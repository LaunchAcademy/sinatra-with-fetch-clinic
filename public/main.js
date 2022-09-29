// this method will be called later to: select the "locations" ul,
// then for every location in some "locations" array that is passed
// append that location string to the DOM in an li tag
const appendLocationsArrayToHtml = (locations) => {
  const locationList = document.getElementById('locations')
  let listItems = " "

  locations.forEach(location => {
    listItems += `<li>${location.city}, ${location.country}</li>`
  })
  locationList.innerHTML = listItems
}







const fetchLocations = async () => {
   const response = await fetch("/api/v1/locations") 
   const parsedLocationsObject = await response.json()
   appendLocationsArrayToHtml(parsedLocationsObject.locations)
}


const postLocation = async (event) => {
  event.preventDefault()

  const cityInputField = document.getElementById('city')
  const countryInputField = document.getElementById('country')

  const newLocationToSendViaFetch = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  const response = await fetch("/api/v1/locations", { 
    method: "POST", 
    body: JSON.stringify(newLocationToSendViaFetch),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })

  const postFetchLocationsBody = await response.json()
  appendLocationsArrayToHtml(postFetchLocationsBody.locations)

  formElement.children().forEach(child => {
    if input 
      child.value()
  })
}


console.log("running JS code")
fetchLocations()
// console.log("Fetch complete")

const formButton = document.getElementById('new-location-submit-button')
formButton.addEventListener('click', postLocation)

let appendLocationsArrayToHtml = (locations) => {
  let locationList = document.getElementById('locations')

  locations.forEach(location => {
    locationList.innerHTML += `<li>${location.city}, ${location.country}</li>`
  })
}

let fetchLocations = () => {
  fetch("/locations.json")
  .then((response) => {
    if (response.ok){
      return response
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
      throw(error);
    }
  })
  .then((returnfromthelastthen) => {
    return returnfromthelastthen.json()
  })
  .then((parsedResponse) => {
    appendLocationsArrayToHtml(parsedResponse.locations)
  })
  .catch((error) => {
    console.log(error)
  })
}


let postLocation = (event) => {
  event.preventDefault()

  let cityInputField = document.getElementById('city')
  let countryInputField = document.getElementById('country')

  let newLocation = {
    location: {
      city: cityInputField.value,
      country: countryInputField.value
    }
  }

  fetch("/locations.json", {
    method: "POST",
    body: JSON.stringify(newLocation)
  })
  .then((response) => {
    return response.json()
  })
  .then((parsedResponse) => {
    appendLocationsArrayToHtml(parsedResponse.locations)
  })
}

fetchLocations()

document
  .getElementById('new-location-submit-button')
  .addEventListener('click', postLocation)

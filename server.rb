require 'sinatra'
require 'sinatra/reloader'
require 'pry'

set :bind, '0.0.0.0'

def write_to_json_file(location)
  # retrieve existing JSON
  file = File.read("locations.json")
  # parse JSON into a Ruby data structure (an array)
  locations_array = JSON.parse(file)
  # determine the id of the soon to be persisted location by using the last location's id + 1
  new_location_id = locations_array["locations"].last["id"] + 1
  
  # construct a hash that matches the pattern existing in the JSON file
  new_location = {
    id: new_location_id,
    city: location["city"],
    country: location["country"]
  }

  # add our new location data to the old location data (in Ruby only, unpersisted in json file)
  updated_locations = {
    locations: locations_array["locations"].concat([new_location])
  }

  # Either of these two lines will work: pretty_generate just gives us line
  # breaks and indentation in our .json file (making it easier on the eyes)

  # updated_locations_json = updated_locations.to_json
  updated_locations_json = JSON.pretty_generate(updated_locations, indent: ' ')

  File.write("locations.json", updated_locations_json)
  # return new_location
  return updated_locations
end

get "/" do
  redirect to "/locations"
end

get "/locations" do
  # binding.pry
  erb :index
end

get "/api/v1/locations.json" do
  # grab the info we need
  locations_json_data = File.read("locations.json")
  
  status 200
  content_type :json
  locations_json_data
end

post "/api/v1/locations.json" do
  new_location_data = JSON.parse(request.body.read)
  
  updated_location_hash = write_to_json_file(new_location_data["location"])
  
  status 200
  content_type :json
  updated_location_hash.to_json
end

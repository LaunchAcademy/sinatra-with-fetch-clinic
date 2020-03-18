require 'sinatra'
require 'sinatra/reloader'
require 'pry'

set :bind, '0.0.0.0'

def write_to_json_file(location)
  # grab the locations json
  file = File.read("destinations.json")
  # parse from JSON notation to ruby
  locations_array = JSON.parse(file)

  # create a new id for our new location
  new_location_id = locations_array["locations"].last["id"] + 1

  # correctly format our new location in an object
  new_location = {
    id: new_location_id,
    city: location["city"],
    country: location["country"]
  }

  # create a new object representing the entire file, and add our new location to it
  updated_locations = {
    locations: locations_array["locations"].concat([new_location])
  }

  # convert from ruby to JSON notation
  updated_locations_json = updated_locations.to_json

  # Either of these next two lines will work: pretty_generate just gives us line
  # breaks and indentation in our .json file (making it easier on the eyes)
  # updated_locations_json = JSON.pretty_generate(updated_locations, indent: ' ')

  File.write("destinations.json", updated_locations_json)
end

get "/" do
  redirect to "/locations"
end

get "/locations" do
  # binding.pry
  puts "hit the standard HTTP locations route"
  File.read('public/index.html')
end

get "/locations.json" do
  # grab the info we need
  locations_json_data = File.read("destinations.json")


  # prepare a response for our fetch request
  status(200)
  content_type(:json)
  locations_json_data
end

post "/locations.json" do
  new_location_data = JSON.parse(request.body.read)

  updated_locations_hash = write_to_json_file(new_location_data["location"])

  status 200
  content_type :json
  updated_locations_hash.json
end

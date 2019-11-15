## BIKES (Node JS Rest API)
This is a NodeJS Rest API which allows to manage a list of bikes.

You can get all bikes or a single bike, add or edit a bike, delete a bike.

There is no database fo this example but a simple Json file. All the requests work with this file (`bikesdatabase.json` located in the data folder)

## Getting Started
```
Git Clone or download the project
npm install
npm run start
```

Your API will be running at `http://localhost:3000/api/bikes`

## Usage

This API allows `GET`, `POST`, `PUT` and `DELETE` requests and `Json` content only. 

##### Json format

```
{
    "id": "cfc47736-9a27-4dbe-9d65-2055aced6aef",
    "name": "Audacio 400",
    "brand": "Lapierre",
    "year": 2014,
    "type": "racing"
}
```

*id is auto generated you just need to send name, brand, year and type.*

## Requests and Responses

Request      | Response
------------ | -------------
`GET /api/bikes` | Return the list of all bikes
`GET /api/bikes/{id}` | Return the specified bike with id
`POST /api/bikes/new` | Add a new bike
`PUT /api/bikes/edit/{id}` | Modify the specified bike with id
`DELETE /api/bikes/delete/{id}` | Delete the specified bike with id

## Status Codes
Code  | Status  | Information
----- | ------- | -----------
`201` | *The bike has been created* | Success, resource was created.
`202` | *No bikes available* | Success but the Json file is empty. There is no more data.
`400` | *Fields are not good* | The body of your request (POST or PUT) is wrong. The API needs Json content with the right properties according to the bike Model (name, brand, year, type).
`404` | *This ID does not exist* | You enter a wrong Id that doesn't match with any bike.
`500` | *Server Error* | 


## TESTS
You can easily test the API with [Postman](https://www.getpostman.com "Get Postman !"), a dedicated platform for API development. 


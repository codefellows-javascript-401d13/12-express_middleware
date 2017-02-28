![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 12: Single Resource Express API
===
##Lab 12: Single Resource Express API

## The build out of this API:
- Created a HTTP server using express
- Created an object constructor which then creates a simple resourse with three properties
-       1. id
-       2. genre
-       3. artist
- Created a single resource `express` API that can handle **GET**, **POST**, and **PUT** requests
- Used the `http-errors` module to create new errors and associate them with a proper status code
- Created an `error-middleware` module to handle errors and *use* it in your server file
- Created a `cors-middleware` module that will allow for public use of your API
- Created a storage module that stores resources by their schema type
- Created the `deleteItem` and `availIDs` methods and add them to your `storage` module
   * these methods should be used to delete a resource (`deleteItem`) and return an array of id's from persisted resource filenames (`availIDs`)
- Created a series of `note-route-tests` to test your **GET**, **POST**, and **PUT** routes

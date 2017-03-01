![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 12: Single Resource Express API
===

### Single Resource API

This single resource API uses the Express framework along with other native Node modules to help me keep track of all the members of my big family. So far I have fields set up for their `name` and `relation`. It leverages the Bluebird promisifying library on the File System module to add a layer of persistence:

* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system

And of course it is open source with a [public repository][repo]
 on GitHub.

### Installation

This API requires [Node.js](https://nodejs.org/) v4+ to run.

Clone down the repo, install the dependencies and devDependencies and start the server.

```sh
$ git clone git@github.com:dkulp23/12-express_middleware.git
$ npm install -d
$ npm start
```

Install and use the HTTPie library to make a POST request to the API:

```sh
$ brew install httpie
$ http POST :3000/api/family name="bernard" relation="drunk uncle"
```
To GET the records you've created, you'll first need to copy & past their unique ID:
```
$ http :3000/api/family/<paste unique id here>
```
And if you want to DELETE it:
```
$ http DELETE :3000/api/family/<paste id to delete here>
```

Passing 4 tests on 3 defined routes (POST, GET, PUT). DELETE being used to keep filesystem clean during testing.

To run tests simply go to your command line and type:
```sh
$ npm test
```

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [repo]: <https://github.com/dkulp23/11-single_resource_express_api>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

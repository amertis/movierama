## MovieRama Backend Documentation ##

### Installation ### 

* Make sure that ports 5000 and 27017 are available in the machine and that docker is installed.
Unzip the file, open a terminal inside the project folder and type:
```
    docker-compose up
```

To access the application open:
```
    http://localhost:5000/site/

```

The application is initialized with ~50 dummy movies and a 100 users with dummy ratings.
You can either create a new user or use one of the existing users as:
* username: testUserX@gmail.com  with X:1..100 
* password: test

Also the following reports are available:
```
    api report: http://localhost:5000/docs/apidoc/index.html
    JS code report: http://localhost:5000/docs/jsdoc/index.html
    test report: http://localhost:5000/docs/testreport/index.html
    coverage report: http://localhost:5000/coverage/lcov-report/index.html
```

### Features ###

* Technologies: Node,Express, React, MongoDB, Docker


### Code Walkthrough ###

* client: the react client
* config: the server configuration
* controllers: the http endpoints which validate input, route to appropriate service
and return the result.
* daos/db/models: Data access layer.
* fixtures: test data for setting up the db
* http: the http service layer.
* middleware: modules running before the controllers in the request chain. e.g. authentication
* services: the business logic layer.
* tests: UAT and unit tests
* validator: request validators.
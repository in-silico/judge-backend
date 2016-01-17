judge-backend
=============

Backend service for UTPJudge project, basically aims to serve the info
(statements, constraints, etc) for programming contests through a
[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer).
This API will be used by the
[judge-frontent](https://github.com/in-silico/judge-frontend).

The second aim for this backend service is to talk with the
[judge-bot](https://github.com/in-silico/judge-bot) service.
This communication will use the [ZeroMQ](http://zeromq.org/) library.

## RESTful API


| url                     | method   | description                | notes / examples |
| ----------------------- | -------- | -------------------------- | ------------- |
| /users                  | GET      | returns all the users      |  |
| /users                  | POST     | create new user            |  |
| /problems               | GET      | returns all the problems   |  |
| /problems               | POST     | create new problem         |  |
| /submissions            | GET      | returns all the submissions|  |
| /submissions            | POST     | create new submission      |  |
| /submissions/pending    | GET      | returns all the pending submissions|  |
| /contests               | GET      | returns all the contests   |  |
| /contests/add/:id       | POST     | add an specific problem to a contest with id equals to :id | {"problem\_id": "569c05394d91caf85fdbd6e4" } |


## ZerMQ API.

To be defined.


Requirements/Dependencies
=========================

- [ZeroMQ](http://zeromq.org/)
- [NodeJS](https://nodejs.org/en/)


Installation
============

    npm install

Testing
=======

    npm run test


Run
===

    npm start

Using judgebot from command line
================================

The judge-backend can be used with [curl](https://en.wikipedia.org/wiki/CURL), here you have some examples.

We strongly recommend you to use [prettyJSON](https://www.npmjs.com/package/prettyjson)

- create a new user:

        $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Toby"}' localhost:8080/users | prettyjson

    You will receive the following:

        __v:       0
        updatedAt: 2016-01-13T19:25:59.000Z
        createdAt: 2016-01-13T19:25:59.000Z
        _id:       5696a4c78acb3a8559df3371
        username:
        email:
        name:      Toby

- get all the users:

        curl localhost:8080/users | prettyjson


- submmit solution:


        curl -X POST -F "data=@solution.cc" localhost:8080/submissions | prettyjson


Contributing
============

Contribution to this project is welcome and it is suggested using pull requests
in github that will then be reviewed and merged or commented on. A more specific
contribution guideline is outlined on the [zmq site](http://zeromq.org/docs:contributing),
we use that guide as reference.

Please feel free to add yourself to the
[COLLABORATORS](https://github.com/in-silico/judge-backend/blob/master/COLLABORATORS)
file in an alphanumerically sorted way before you raise the pull request.


Licensing
=========

The project is released under the MPLv2 license.

Please see LICENSE for full details.

_______

Developed by In-silico.

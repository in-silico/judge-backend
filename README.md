judge-backend
=============

[![Dependency Status](https://david-dm.org/in-silico/judge-backend.svg)](https://david-dm.org/in-silico/judge-backend)

Backend service for UTPJudge project, basically aims to serve the info
(statements, constraints, etc) for programming contests through a
[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer).
This API will be used by the
[judge-frontent](https://github.com/in-silico/judge-frontend).

The second aim for this backend service is to talk with the
[judge-bot](https://github.com/in-silico/judge-bot) service.


## RESTful API


| url                     | method   | description                | params |
| ----------------------- | -------- | -------------------------- | ------------- |
| /users                  | GET      | returns all the users      |  |
| /users                  | POST     | creates a new user            | <ul> <li> email </li> <li> name </li> <li> username </li> </ul> |
| /users/:id              | PUT      | modifies user data         | <ul> <li> email </li> <li> name </li> <li> username </li> </ul> |
| /users/:id              | DELETE   | remove a user              |  |
| /problems               | GET      | returns all the problems   |  |
| /problems/:id           | GET      | returns a specific problem   |  |
| /problems               | POST     | creates a new problem         | <ul> <li> author </li> <li> description </li> <li> title </li> </ul> |
| /problems/:id/tc        | POST     | adds one or more test cases to one problem | You can send a pair of (.in, .out) files or you can send a .tar.gz file with several test cases inside. <br></br> If you decide to send a .tar.gz, take care of the name of files, we will add one test case for each file which the .in and .out match. <br></br> For example, if the .tar.gz contains the files 'a.in', 'a.out' , 'b1.in', 'b3.out', only the test case (a.in, a.out) will be added.|
| /problems/:id           | PUT      | modifies problem data         | |
| /problems/:id           | DELETE   | remove a problem              | |
| /submissions            | GET      | returns all the submissions|  |
| /submissions            | POST     | creates a new submission   | <ul> <li> problem\_id </li> <li> contest\_id </li>  <li> user\_id, <b>temporal</b>: must be taken from session </li> <li> source\_code: attached as multipart/form file </li> </ul> |
| /submissions/pending    | GET      | returns all the pending submissions|  |
| /contests               | GET      | returns all the contests   |  |
| /contests/:id           | GET      | returns a specific contest   |  |
| /contests               | POST     | creates a new contests     | <ul> <li> description </li> <li> title </li> </ul> |
| /contests/:id/add       | POST     | add one or more problems to a contest with id equals to :id | Object with <ul> <li> problem\_id </li> <li> memory\_limit (optional) </li> <li> time\_limit (optional) </li> </ul> or one array with several objects of that type.|
| /contests/:id         | PUT      | modifies contest data   |  |
| /contests/:id         | DELETE   | remove a contest        |  |

## Bot API.

All the messages are sent through TCP connections and must be parsable to JSON arrays.

*Important:* All the messages must be ended with the '\0'  character.

The first element in the array defines the type of the operation.

### bot-to-backend messages.

    ['judgement', verdict] : judgement result. An event must be emited with this message.
    ['ready'] : bot announcing that is ready to judge
    ['file', path] : file solicitation.

### backend-to-bot messages.

    ['submission', data] : submission solicitation. Exactly format of 'data' will be defined HERE(TO DO).
    ['file', file_identifier, buffer] : part of the file 'file_identifier' contained into a NodeJS buffer.
    ['endfile', file_identifier] : Announce that the file 'file_identifier' was completely sent.


Requirements/Dependencies
=========================

- [NodeJS](https://nodejs.org/en/)
- [Mongodb](https://docs.mongodb.org/manual/installation/)


Installation
============

    npm install

In order to authenticate users with the github API you need to do some
extra work:

- [Configure a reverse proxy + dns](https://github.com/in-silico/utpjudge#set-up-judge-behind-reverse-proxy)
- [Get API keys from github](https://github.com/in-silico/utpjudge#get-api-keys-from-github)

Testing
=======

    npm run test


Run
===

    npm start


Using judge-backend from command line
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

<a href="//github.com/in-silico" target="_blank"><p align="center"><img src="https://cloud.githubusercontent.com/assets/14989202/11768037/94347c26-a18e-11e5-84ad-a8554c9fe75d.png" width=110px></img></p></a>

<p align="center">Developed by In-silico.</p>

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

To be defined.

## ZerMQ API.

To be defined.


Requirements/Dependencies
=========================

- [ZeroMQ](http://zeromq.org/)
- [NodeJS](https://nodejs.org/en/)


Installation
============


    npm install



Run
===


    npm start



Contributing
============

Contribution to this project is welcome and it is suggested using pull requests
in github that will then be reviewed and merged or commented on. A more specific
contribution guideline is outlined on the [zmq site](http://zeromq.org/docs:contributing),
we use that guide as reference.

Please feel free to add yourself to the
[COLLABORATORS](https://github.com/in-silico/judge-backend/blob/master/COLLABORATORS)
file in an alphanumerically sorted way before you raise the pull request.

Documentation
=============


Licensing
=========

The project is released under the MPLv2 license.

Please see LICENSE for full details.

_______

Developed by In-silico.

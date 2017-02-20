# Orchestration Container #

The Orchestration component orchestrates the business logic of the whole platform.

### Architecture Principles ###

* Adapter Based.
* Microserices oriented.
* Version 0.1

### How do I get set up? ###

The setup steps provides the developer with the tools to test and build the source code.

#### Configuration ####
The environment configuration is provided within the application. 

#### Dependencies ####
The project needs the following global dependencies:

* node.js.
* gulp module.
* mocha module.
* chai module.

Once installed is required to install also gulp and mocha as global modules.

```
#!bash
npm install -g gulp mocha
```

You can run install the project dependencies issuing the following command:

```
#!bash
npm install
```

#### Run ####
You can run the project using the following command:

```
#!bash
npm start
```

#### Development Testing ####
The test suite uses a gulp task in order to run the suite in development mode:

```
#!bash
gulp bdd
```

#### Testing ####
The test suite can be executed independently executing:

```
#!bash
gulp test-coverage
```

#### Code Coverage ####
We can generate the code coverage reports based on the istanbul reporter with the following command:

```
#!bash
gulp test-coverage
```

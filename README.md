# Obatin-API
Obatin-API project is part of the Obatin application. This is an API build with the Hapi.js as web application framework, Sequelize as ORM, and node-nlp as a BOT mockup.

&nbsp;
Note : for now the bot mockup plugin has been disabled but if you want to activate it, please uncomment the "talk" plugin in the server.js file

## Features
* Build with Hapi Js framework so that code can be easily modularized
* API documentations with Swagger
* Bearer authentication
* In-Memory Cache with Memcached

## Project structure 
* **src**
  * **api** (custom plugin)
    * **authentications**
      * documentations.js (documentation and authentication need to be stored here)
      * handler.js
      * index.js
      * routes.js
    * **ML**
    * **talk**
    * **users**
  * **bot** (storing intents and model from the bot mockup)
  * **config** (db config)
  * **exceptions** (handling error exceptions)
  * **migrations** (migration files)
  * **models** (contains all of model classes)
  * **services** (service layer)
  * **tokenize** (set of functions to handle jwt tokens)
  * **utils** (This directory contains several utility programs)
  * **validator** (validation input output)
  * server.js (function that start hapi server)
  * swaggerOption.js (swagger options)
* .env (environment file)

## Installation
1) Clone this repo
  ```
  $ git clone https://github.com/Ian-72/Obatin-API.git
  ```

2) Go to Obatin-API directory
  ```
  $ cd Obatin-API
  ```

3) Install the required modules
  ```
  $ npm install
  ```

4) Don't forget to set host, port, token, and external ML API url in .env file, if you want to run this server in production set config in .env file for the database configurations else if you want to run in development set in ./src/config/config.js

5) run migrate
  ```
  $ npm run migrate
  ```

6) Start API server
  * run in development
    ```
    $ npm run start-dev
    ```
  * but if you want to run in production
    ```
    $ npm i -g pm2
    $ npm run start-prod
    ```

7) View the API documentation at (if you user development environtment)
[http://localhost:5000/docs](http://localhost:5000/docs)
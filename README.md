<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Task Management API

### Introduction

This is a basic REST API used to manage tasks.

This api was developed using

- NodeJs
- NestJs (v10.0.0)
- Prisma (PostgreSQL database)

## Getting Started

### Prerequisites

The tools listed below are needed to run this application to run effectively:

- Node (LTS Version)
- Npm v8.3.1 or above
- Postgres Database

You can check the Node.js and npm versions by running the following commands.


You can get the latest version of NodeJS from [here](https://nodejs.org/en/download/) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  node -v
```

You can get the latest version of NPM from [here](https://www.npmjs.com/get-npm) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  npm -v
```

## Installation

Clone the project

```bash
  git clone git@github.com:Omoleen/task_management_api.git
```

Go to the project directory

```bash
  cd task_management_api
```

Install dependencies

```bash
  npm install
```
Set Up Environment Variables

Create a .env file in the root directory and add your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
```
Generate Prisma Client

Run the following command to generate the Prisma client:


```bash
npx prisma generate
```
Run Database Migrations

Apply the migrations to your PostgreSQL database:

```bash
npx prisma migrate dev --name init
```
Start the Application

Start the NestJS application:

```bash
npm run start:dev
```



Access endpoints on localhost

```bash
  http://localhost:3000/api/
```


## API Reference

| Method | Description                    | Endpoints                   |
| :----- | :----------------------------- | :-------------------------- |
| POST   | Register a user             | /register         |
| POST   | Login a user                | /login            |
| GET    | Get all tasks              | /tasks              |
| GET    | Get a single task           | /tasks/:id              |
| POST   | Create a task             | /tasks           |
| PUT    | Edit a task               | /tasks/:id              |
| DELETE | Delete a task             | /tasks/:id              |


<!-- ## Run the tests

Unit Tests

```shell
npm run test
```

End to End Tests

```shell
npm run test:e2e
``` -->

# REST API

The base URL is

    http://localhost:3000/api
    

The base URL for the live version is

    https://task-mgt-api-b197fb54d870.herokuapp.com/api

## API Documentaion

You [click here](https://task-mgt-api-b197fb54d870.herokuapp.com/schema/swagger) to access the Api Documentation

    https://task-mgt-api-b197fb54d870.herokuapp.com/schema/swagger



## Authors

- [@Omoleen](https://github.com/Omoleen)

## License

[MIT](https://choosealicense.com/licenses/mit/)
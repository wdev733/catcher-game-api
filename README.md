## Overview

This repo is a service API for [Cacther Game](https://github.com/wdev733/catcher-game-app) app

This repo contains the basic setup for a [NestJS](https://nestjs.com/) app. Use it as a starter for creating new backend services.

## Setup

1. Install dependencies:

   ```bash
   $ npm install
   ```

   Install NVM and set node versuion to 18.12.1
   https://github.com/nvm-sh/nvm/blob/master/README.md

2. Create an environment variables files (`.env`) using `.env.example` as a starting point. Make sure to
   to update env with your values.

   ```bash
   $ cp .env.example .env
   ```

3. Install the NestJS CLI globally (optional but recommended):

   ```bash
   $ npm i -g @nestjs/cli
   ```

## GUI for database

   ```bash
   $ npm run prisma:studio
   ```

## Running the app

```bash
$ npm run dev
```

## Swagger document

You can see the swagger document at [http://localhost:4201/swagger](http://localhost:4201/swagger)

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

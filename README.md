# notes

A full featured notes application running in docker containers, powered by docker-compose, node.js, express, react, passport.js and tinymce.

It's running in production [here](https://notes.qoed.dev).

## Dependencies

This application runs in docker containers which makes it possible to run the development environment on any platform.

Install Docker and Docker Compose and you're good to go.

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Prerequisites

### Running dev environment

1. Copy `api/config/.env-copy` to `api/config/.env` and provide values for the variables
2. Copy `frontend/.env.development-copy` to `frontend/.env.development` and provide values for the variables

### Running prod environment

1. Copy `api/config/.env-copy` to `api/config/.env` and provide values for the variables
2. Copy `frontend/.env.production-copy` to `frontend/.env.production` and provide values for the variables

## Start development environment

- Enter the project root folder
- Run this command:
  - ```bash
    docker-compose up --build
    ```

## Stop development environment

- Press CTRL-C to cancel the running process
- From the project root folder, run this command to bring down the docker network
  - ```bash
    docker-compose down
    ```

## Start production environment

- Enter the project root folder
- Run this command:
  - ```bash
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
    ```

## Stop production environment

- From the project root folder, run this command to bring down the docker network
  - ```bash
    docker-compose down
    ```

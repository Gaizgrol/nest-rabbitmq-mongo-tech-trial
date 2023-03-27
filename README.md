# Backend Task - NestJS + RabbitMQ + MongoDB

## 🎯 Objective

The task is to create a simple REST application from scratch. Using NestJS (TypeScript), MongoDB, RabbitMQ and integrate some endpoints to ReqRes API.

The application should consist of:

- `POST` /api/users
- `GET` /api/user/{userId}
- `GET` /api/user/{userId}/avatar
- `DELETE` /api/user/{userId}/avatar

For more details, check the **📚 API Documentation and endpoint testing** section.

## 🏃 Running the project

You should have a **Docker** environment with support to **Docker Compose V2**.

_This project uses bash scripts to make some commands easier to run and was tested only on a Linux machine. If you are using Windows, I highly recommend you running this project inside a WSL2 distro, or using Git Bash as your terminal._

Open your terminal in the root folder and type:

```sh
./run.sh
```

This script will make sure to build your images and install all dependencies if you doesn't have a `node_modules` folder yet _(first run only)_ and start all containers. In subsequent runs, it will skip the installation step and directly start all containers.

To stop running containers, just type

```sh
./stop.sh
```

and all your containers will be dropped.

## 📄 Scripts

Beyond `run.sh` and `stop.sh`, we have three other helper scripts:

- `attach.sh`: Attach to a terminal inside NestJS container
- `build.sh`: Rebuilds the images in case you changed something in the Dockerfiles
- `drop-db.sh`: Drops **all** the data from the MongoDB container. _This script needs super user privileges_.

## 🔍 Visualizing Data

### ⚠️ **DON'T USE** EXTERNAL TOOLS TO CONNECT TO MONGODB OR RABBITMQ! ⚠️

MongoDB's and RabbitMQ's services are not exposed at any port to the host machine, so you cannot connect directly to them. Please, use

- _MongoDB Database Manager_ available at `http://localhost:8081/`
  - User: `root`
  - Password: `example`
- _RabbitMQ Admin Panel_ available at `http://localhost:15672/`
  - User: `user`
  - Password: `pass`

## 📚 API Documentation and endpoint testing

All endpoints were documented using Swagger for NestJS. All you have to do is open `http://localhost:3000/api-docs` and give it a go.

## 🧪 Unit/Functional Testing

Attach to Nest's container terminal using Docker Desktop "Terminal" tab, or run

```sh
./attach.sh
```

to access the container's terminal. After that, run

```sh
npm test
```

and all unit tests should start running.

## 📂 FileSystem Storage

All image data derived from `GET /api/user/{userId}/avatar` will be stored in the `nestjs/storage` folder!

## 🚧 Troubleshooting

- Make sure you have these ports available before running the projects:
  - `3000`: Used by Nest.js API
  - `8081`: MongoDB's Database Manager
  - `15672`: RabbitMQ's Admin Panel
- Make sure your Docker daemon is running!
- Make sure you are using a newer version of Docker that supports Docker Compose V2! **This project does not use `docker-compose`** (a.k.a. V1) because this version will no longer be supported from the end of June 2023.
- "I'm using MongoDB Compass and no data is being saved in any collection!". Probably you are running MongoDB in your host machine and Compass is connected to your local instance. This is not necessary, given that there is an instance running inside docker that is not accessible to your network. Please use the tools mentioned at **🔍 Visualizing Data** section.
- If you are somehow receiving `Permission denied` when trying to run any scripts, run
  ```sh
  chmod +x ./*.sh && chmod +x ./docker/*.sh
  ```
  to make sure your terminal can execute utility scripts and Nest's container can execute the entrypoint script.
- If you are having trouble trying to access these routes:

  - `GET /api/user/{userId}`
  - `GET /api/user/{userId}/avatar`

  Make sure you have an internet connection and your network can reach `https://reqres.in/`

- "I created user `'12389193'` but I cant GET him back!". That's covered by the specification: This user will be saved in the database, but when we GET an user, we aren't fetching this data from the database anymore - the data is from ReqResAPI, and it only supports user IDs from `'1'` to `'12'`, so you can't access any other users beyond these twelve.

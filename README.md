# Backend Task - NestJS + MongoDB

## 🎯 Objective

The task is to create a simple REST application from scratch.

## ⚙️ Tech Stack

- Docker
- NestJS
- MongoDB
- RabbitMQ

## 🗒️ Description

The REST app should consist of:

### `POST` /api/users

- On the request store the user entry in db. After the creation, send an email and rabbit event. Both can be dummy sending (no consumer needed).

### `GET` /api/user/{userId}

- Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.

### `GET` /api/user/{userId}/avatar

- Retrieves image by 'avatar' URL.
- On the first request it should save the image as a plain file, stored as a mongodb entry with userId and hash. Return its base64-encoded representation.
- On following requests should return the previously saved file in base64-encoded. representation (retrieve from db).

### `DELETE` /api/user/{userId}/avatar

- Removes the file from the FileSystem storage.
- Removes the stored entry from db.

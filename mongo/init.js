const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    API_USER_NAME,
    API_USER_PASSWORD,
    API_USER_DATABASE,
} = process.env

db.getSiblingDB('admin').auth(
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB(API_USER_DATABASE)

db.createUser({
    user: API_USER_NAME,
    pwd: API_USER_PASSWORD,
    roles: [
        {
            role: "readWrite",
            db: API_USER_DATABASE,
        }
    ],
});
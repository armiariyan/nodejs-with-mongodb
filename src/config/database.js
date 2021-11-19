import mongoose from 'mongoose';


const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

// mongoose.connect("mongodb://localhost:27017/api_with_mongo", {
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;


export default db;
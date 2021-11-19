"use strict";var _express=_interopRequireDefault(require("express"));var _cors=_interopRequireDefault(require("cors"));var _database=_interopRequireDefault(require("./config/database"));var _index=_interopRequireDefault(require("./routes/index"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}require("dotenv").config();const app=(0,_express.default)();// For configuring cors
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 
//   }
app.use((0,_cors.default)());// Database connection
_database.default.on("error",error=>console.error(error));_database.default.once("open",()=>console.log("Database Connected"));app.use(_express.default.json());app.use("/",_index.default);// set port, listen for requests
const PORT=process.env.NODE_DOCKER_PORT||8080;app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}.`)});
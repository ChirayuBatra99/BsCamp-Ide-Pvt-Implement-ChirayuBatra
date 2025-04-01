require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { socketHandler, routes } = require('./routes/socket');
const http = require('http');

const PORT = process.env.PORT;

const { Server } = require('socket.io');


require('./database/dbsql')
require('./database/dbmongo');

const User = require("./models/user");
const Message = require("./models/message");
const Friends = require("./models/friendList");

const app = express();

const router = require("./routes/routerSql");
const routerForBids = require("./routes/routerBids");
const mongoRouter = require("./routes/routerMongo");

const path = require("path");

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Socket code
const server = http.createServer(app);
const io = new Server(server);
socketHandler(server, io);
routes(app, io);

server.listen(3000, () => {
    console.log('Socket is running on port 3000');
});
// Socket code ends

app.use(router);
app.use(routerForBids);
app.use(mongoRouter);

app.listen(PORT, ()=>{
    console.log("app running on PORT", PORT);
})
require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3005;

const weather = require("./weather");

app.use(express.json());


// for develpoment, you would like to change when deployment
const whitelist = ["http://127.0.0.1","http://localhost" ,"http://127.0.0.1:5500"];

const corsOptions = {
//  origin: (origin, callback) => {
//    if (!origin || whitelist.indexOf(origin) !== -1) {
//      callback(null, true);
//    } else {
//      callback(new Error("Not allowed by CORS"));
//    }
//  },
//  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 1000, // 1 seconds
  max: 1 // 1 req per second
});
app.use(limiter);

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
  });

app.use(speedLimiter);


//test route
app.get("/", (req, res) => res.json({ success: "Hello World!" }));

app.use("/weather", weather);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
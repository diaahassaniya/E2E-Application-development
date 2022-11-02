const express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  session = require("express-session"),
  compression = require("compression");

const roomRouter = require("../controllers/Room"),
  cameraRouter = require("../controllers/camera"),
  userRouter = require("../controllers/user");

const { validUser } = require("../framework/helper");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

const corsOptions = {
  origin: "http://127.0.0.1:3000",
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};

app.use(compression());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "secret$%^134",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: oneDay, // session max age in miliseconds
    },
  })
);

//load main routes
app.use("/api", userRouter);
app.use("/api", validUser, roomRouter);
app.use("/api", validUser, cameraRouter);

module.exports = { app };

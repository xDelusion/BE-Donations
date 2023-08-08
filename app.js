const cors = require("cors");
const express = require("express");
const config = require("./config/keys");
const authRoutes = require("./api/Auth/auth.routes");
const recipientReqRoutes = require("./api/RecipientRequest/rr.routes");
const paciRoutes = require("./api/Paci/paci.routes");
const questionRoutes = require("./api/Question/question.routes");
const drRoutes = require("./api/DonorRequest/dr.routes")
const notFound = require("./middlewares/notFoundHandler");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./database");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const recipientReqRoutes = require("./api/RecipientRequest/rr.routes");
connectDb();

//declare var
const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes:
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/auth", authRoutes);
app.use("/api/recipient", recipientReqRoutes);
app.use("/api/paci", paciRoutes);
app.use("/api/donor",drRoutes);
app.use("/api/question", questionRoutes);

app.use("/api/recipient", recipientReqRoutes);

//errorhandlers:
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

// test

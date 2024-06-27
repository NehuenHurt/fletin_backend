const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config auth2.0/google");
const userRoutes = require("./routes/user");
const freightRoutes = require("./routes/freight");
const loginAndRegistrer = require("./routes/loginAndRegistrer");
const googleRoutes = require("./routes/auth 2.0/google");
const VerifyToken = require("./middleware/verifyToken");
const app = express();
const port = process.env.PORT || 2000;

//midleware
app.use(express.json()); // for parsing application/json
app.use("/api",VerifyToken, userRoutes);
app.use(loginAndRegistrer);
app.use("/api",VerifyToken, freightRoutes);
app.use(googleRoutes);

//routes
app.get("/", (req, res) => {
  res.send("welcome to api");
});

//mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to database"))
  .catch((error) => console.error(error));

app.listen(port,"192.168.1.6", () => console.log("server listining on port", port));

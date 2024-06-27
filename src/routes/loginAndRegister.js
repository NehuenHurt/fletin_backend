const router = require("express").Router();
const userSchema = require("../models/user");
const freightSchema = require("../models/freight");
const mongoose = require("mongoose");
router.post("/login", async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (user != null) {
    const isMatch = await user.comparePassword(req.body.password);
    if (!(user && isMatch)) {
      return res
        .status(401)
        .json({ message: "Invalid user or password", statusCode: 401 });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Invalid user or password", statusCode: 401 });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  }); // secure true to allow https only

  res.status(200).send({ token: token, statusCode: 200 });
});
router.post("/register", async (req, res) => {
  const user = new userSchema(req.body);
  user._id = new mongoose.Types.ObjectId();
  const doesUserExist = await userSchema.exists({ email: user.email });
  try {
    if (!doesUserExist) {
      await user.save();
      res.status(201).json({
        user: user,
        message: "Usuario creado con exito",
        statusCode: 201,
      });
    } else {
      res
        .status(400)
        .json({ message: "Ya existe el usuario", statusCode: 400 });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
router.post("/registrerFreight", async (req, res) => {
  const freight = new freightSchema(req.body);
  freight._id = new mongoose.Types.ObjectId();
  const user = await userSchema.findOne({ email: req.body.email });
  freight.id_user = user._id;
  freight.phone_num_prefix = 341;
  freight.phone_num = 3896593;
  freight.description = "soy un buen fletero";
  freight.available_days_from = "lunes";
  freight.available_days_to = "viernes";
  freight.available_hour_from = "8:00";
  freight.available_hour_to = "17:hs";
  freight.city = "rosario";
  console.log(freight);
  try {
    await freight.save();
    res.status(201).json({
      freight: freight,
      message: "Usuario creado con exito",
      statusCode: 201,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
module.exports = router;

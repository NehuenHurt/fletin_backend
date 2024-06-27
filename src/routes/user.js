const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

//get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.status(200).json({ user: data, statusCode: 200 }))
    .catch((error) =>
      res.json({ message: "Error al obtener el usuario", statusCode: 400 })
    );
});

//get by id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.status(200).json({ user: data, statusCode: 200 }))
    .catch((error) =>
      res.json({ message: "Error al obtener el usuario", statusCode: 400 })
    );
});

//update user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema.updateOne({ _id: id }, { $set: { name, age, email } });
  then((data) => res.status(200).json({ user: data, statusCode: 200 })).catch(
    (error) =>
      res.json({ message: "Error al modificar el usuario", statusCode: 400 })
  );
});

//delete
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema.deleteOne({ _id: id });
  then((data) => res.status(200).json({ user: data, statusCode: 200 })).catch(
    (error) =>
      res.json({ message: "Error al borrar el usuario", statusCode: 400 })
  );
});

module.exports = router;

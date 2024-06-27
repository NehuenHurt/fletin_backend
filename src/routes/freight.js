const express = require("express");
const freightSchema = require("../models/freight");
const reviewSchema = require("../models/reviewsFreight");
const router = express.Router();
const mongoose = require("mongoose");
//get all freight
router.get("/freight", (req, res) => {
  console.log("sin filtros");
  freightSchema
    .find()
    .then((data) => res.status(200).json({ freights: data }))
    .catch((error) => res.json({ message: "Error al obtener el usuario" }));
});

//filters freight
router.get("/freightFilters", async (req, res) => {
  console.log("con filtros");
  const searchString = req.query.query;
  await freightSchema
    .find({ $text: { $search: searchString } })
    .limit(10)
    .then((data) => res.status(200).json({ freights: data }))
    .catch((error) => res.json({ message: "Error al obtener el usuario" }));
});

//get by id
router.get("/freight/:id", (req, res) => {
  const { id } = req.params;
  freightSchema
    .findById(id)
    .then((data) => res.status(200).json({ freight: data }))
    .catch((error) => res.json({ message: "Error al obtener el usuario" }));
});

//update user
router.put("/freight/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  freightSchema.updateOne({ _id: id }, { $set: { name, age, email } });
  then((data) => res.status(200).json({ freight: data })).catch((error) =>
    res.json({ message: "Error al modificar el usuario" })
  );
});

//delete
router.delete("/freight/:id", (req, res) => {
  const { id } = req.params;
  freightSchema.deleteOne({ _id: id });
  then((data) => res.status(200).json({ freight: data })).catch((error) =>
    res.json({ message: "Error al borrar el usuario" })
  );
});
//create review to freight
router.post("/createReview", async (req, res) => {
  const review = new reviewSchema(req.body);
  review._id = new mongoose.Types.ObjectId();
  try {
    await review.save();
    res.status(201).json({
      review: review,
      message: "Review creada con exito",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//get review by id
router.get("/review/:id", (req, res) => {
    const { id } = req.params;
    reviewSchema
      .findOne({id_user_freight: id})
      .then((data) => res.status(200).json({ review: data }))
      .catch((error) => res.json({ message: "Error al obtener el usuario" }));
  });

module.exports = router;

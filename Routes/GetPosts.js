const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Model = require("../Model/User");


router.get("/", auth, async (req, res) => {
  try {
    const users = await Model.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// get post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const users = await Model.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

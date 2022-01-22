const express = require("express");
const router = express.Router();
const Model = require("../Model/User");

router.patch("/:id",auth, async (req, res) => {
  try {
    const updateUser = await Model.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

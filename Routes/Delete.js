const express = require("express");
const auth = require("../auth");
const router = express.Router();
const Model = require("../Model/User");

router.delete("/", auth, async (req, res) => {
  const authUser = res.locals.user.email;
  console.log(authUser);
  const { id } = req.query;
  try {
    const deletepost = await Model.remove({ _id: id, email: authUser });
    if (deletepost.deletedCount === 0) {
      res.json({
        status: false,
        error: "You are not authenticated for this task",
      });
    } else if (deletepost.deletedCount === 1) {
      res.json({
        status: true,
        error: "Post deleted succesfully",
      });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

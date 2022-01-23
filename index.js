const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Model = require("./Model/User");
const postsRoute = require("./Routes/post");
const getPostsRoute = require("./Routes/GetPosts");
const deleteRoute = require("./Routes//Delete");
require("dotenv/config");
const app = express();

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Yup We Are Live",
  });
});

app.use(bodyParser.json());
app.use("/post", postsRoute);
app.use("/get", getPostsRoute);
app.use("/delete", deleteRoute);

mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err, "ye msla hai"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

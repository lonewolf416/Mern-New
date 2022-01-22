const jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  const token = req.token;
  //   const token =
  //     req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.json({
      status: false,
      error: "A token is required for authentication",
    }); // res.status(403).send("A token is required for authentication"); //
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    res.locals.user = req.user;
  } catch (err) {
    return res.json({
      status: false,
      error: "Invalid Token",
    });
  }
  return next();
};

module.exports = verifyToken;

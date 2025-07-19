const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or format invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

module.exports = authToken;




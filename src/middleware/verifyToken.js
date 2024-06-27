const userSchema = require("../models/user");
const VerifyToken = async (req, res, next) => {
  try {
    const token = req.get("authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", statusCode: 401 });
    }
    const user = await userSchema.findByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", statusCode: 401 });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, statusCode: 500 });
  }
};

module.exports = VerifyToken;

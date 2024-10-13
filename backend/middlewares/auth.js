const jwt = require("jsonwebtoken");
const secret = "Arjun$123@$";

// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       username: user.username,
//     },
//     secret
//   );
// };

// const verifyToken = (token) => {
//   return jwt.verify(token, secret);
// };

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "token not found" });
    }

    const decoded = jwt.verify(token, secret);
    req.username = decoded.username;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "user could not be authenticated" });
  }
};

module.exports = {
  isAuthenticated,
};

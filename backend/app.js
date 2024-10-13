const express = require("express");
const User = require("./models/user");
const connectDB = require("./db");
const cors = require("cors");
const app = express();
const { generateToken, verifyToken } = require("./service/auth");
const PORT = 8000;
const cookieParser = require("cookie-parser");
const { isAuthenticated } = require("./middlewares/auth");
connectDB();

// Middleware to parse JSON payloads
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Middleware to parse URL-encoded payloads (for form data)
app.use(express.urlencoded({ extended: true }));

app.get("/auth/verify", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "no token found" });
    }

    const decoded = verifyToken(token);
    return res.status(200).json({
      status: "success",
      user: "token verified",
      username: decoded.username,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
});
app.post("/logout", async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "username or password is missing" });
    }

    const findUser = await User.findOne({ username, password });
    console.log(findUser);
    if (!findUser) {
      return res.status(400).json({
        status: "error",
        message: "username doesn't exist or password is wrong",
      });
    }
    const token = generateToken(findUser);
    console.log(token);
    res.cookie("token", token);

    return res.status(201).json({
      status: "success",
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({
      status: "error",
      message: "An error occured while logging in",
    });
  }
});
app.post("/register", async (req, res) => {
  try {
    console.log("Request received");
    const { username, password } = req.body;
    //console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ error: "username or password is missing" });
    }

    const existingUser = await User.findOne({ username });
    //console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already registered" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    return res
      .status(201)
      .json({ status: "success", message: "user registered successfully" });
    // res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      message: "An error occured while registering the user",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

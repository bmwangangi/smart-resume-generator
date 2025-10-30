import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

// Helper to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ===============================
// REGISTER CONTROLLER
// POST: /api/users/register
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate token
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    // 6️⃣ Return response
    return res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ===============================
// LOGIN CONTROLLER
// POST: /api/users/login
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Generate token
    const token = generateToken(user._id);
    user.password = undefined;

    // 5️⃣ Return success response
    return res
      .status(200)
      .json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for getting user by id
// GET: /api/users/data

export const getUserById = async (req, res) => {
  try {

    const userId = req.userId;

    //check if user exist
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    // 5️⃣ Return user
    user.password = undefined;
    return res
      .status(200)
      .json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for getting user resumes
//GET: /api/user/resumes

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    //return user resumes
    const resumes = await Resume.find({userId})
    return res.status(200).json({resumes})
  } catch (error) {
     return res.status(500).json({ message: error.message });
  }
}
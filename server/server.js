const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const csvParser = require("csv-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path"); // ADD THIS MISSING IMPORT

const app = express();
const PORT = process.env.PORT || 3001; // Use environment PORT for deployment
const CSV_FILE = "users.csv";

// CORS middleware (KEEP ONLY ONE)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

// Ensure CSV file exists
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "fullName,email,github,password\n");
}

// In-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// Helper function to read users from CSV
const readUsers = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csvParser())
      .on("data", (row) => users.push(row))
      .on("end", () => resolve(users))
      .on("error", reject);
  });
};

// Test endpoint to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    console.log("Received registration data:", req.body);

    const { fullName, email, github, password } = req.body;

    console.log("Individual fields:", {
      fullName: fullName,
      email: email,
      github: github,
      password: password ? "***provided***" : "missing",
    });

    // Check for empty or undefined fields
    if (
      !fullName ||
      !email ||
      !github ||
      !password ||
      fullName.trim() === "" ||
      email.trim() === "" ||
      github.trim() === "" ||
      password.trim() === ""
    ) {
      console.log("Validation failed: Missing or empty fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    const users = await readUsers();

    if (users.some((user) => user.email === email)) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists." });
    }

    // Clean the data before saving
    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanGithub = github.trim();

    // Append new user to CSV
    fs.appendFileSync(
      CSV_FILE,
      `${cleanFullName},${cleanEmail},${cleanGithub},${password}\n`
    );

    console.log("User registered successfully:", cleanEmail);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
});

// Login endpoint - ADD /api PREFIX
app.post("/api/login", async (req, res) => {
  try {
    console.log("Login attempt:", req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const users = await readUsers();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      console.log("Invalid credentials for:", email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("Login successful for:", email);
    res.status(200).json({
      message: "Login successful.",
      user: {
        fullName: user.fullName,
        email: user.email,
        github: user.github,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
});

// Forgot password endpoint - ADD /api PREFIX
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const users = await readUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStorage.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "CloneFest 2025 - Password Reset OTP",
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP sent to:", email);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// Verify OTP endpoint - ADD /api PREFIX
app.post("/api/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const otpData = otpStorage.get(email);

    if (!otpData || otpData.expires < Date.now()) {
      otpStorage.delete(email);
      return res.status(400).json({ message: "OTP expired or invalid." });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // OTP is valid, generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    otpStorage.set(email, {
      resetToken,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes for password reset
    });

    console.log("OTP verified for:", email);
    res.status(200).json({
      message: "OTP verified successfully.",
      resetToken,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
});

// Reset password endpoint - ADD /api PREFIX
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const tokenData = otpStorage.get(email);

    if (
      !tokenData ||
      tokenData.resetToken !== resetToken ||
      tokenData.expires < Date.now()
    ) {
      otpStorage.delete(email);
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Read all users
    const users = await readUsers();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update password
    users[userIndex].password = newPassword;

    // Rewrite CSV file
    const csvContent =
      "fullName,email,github,password\n" +
      users
        .map(
          (user) =>
            `${user.fullName},${user.email},${user.github},${user.password}`
        )
        .join("\n");

    fs.writeFileSync(CSV_FILE, csvContent);

    // Clear the reset token
    otpStorage.delete(email);

    console.log("Password reset successful for:", email);
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
});

// Serve static files from React build - MOVE TO END
app.use(express.static(path.join(__dirname, "../dist")));

// Serve React app for all non-API routes - MOVE TO END
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// SINGLE app.listen() call
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

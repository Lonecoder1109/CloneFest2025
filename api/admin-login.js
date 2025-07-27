const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@clonefest.com",
  password: process.env.ADMIN_PASSWORD || "CloneFest2025Admin!",
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const adminToken = Buffer.from(`admin:${Date.now()}`).toString("base64");

      res.status(200).json({
        message: "Admin login successful.",
        adminToken,
        isAdmin: true,
      });
    } else {
      res.status(401).json({ message: "Invalid admin credentials." });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
}

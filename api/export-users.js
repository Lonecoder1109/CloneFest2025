import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

function verifyAdminToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    return decoded.startsWith("admin:");
  } catch {
    return false;
  }
}

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

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Admin access required." });
    }

    const token = authHeader.substring(7);
    if (!verifyAdminToken(token)) {
      return res.status(401).json({ message: "Invalid admin token." });
    }

    const snapshot = await db.collection("users").get();
    const users = [];

    snapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        fullName: userData.fullName,
        email: userData.email,
        github: userData.github,
        createdAt: userData.createdAt,
      });
    });

    const format = req.query.format || "json";

    if (format === "csv") {
      const csvHeader = "ID,Full Name,Email,GitHub,Created At\n";
      const csvRows = users
        .map(
          (user) =>
            `"${user.id}","${user.fullName}","${user.email}","${user.github}","${user.createdAt}"`
        )
        .join("\n");

      const csv = csvHeader + csvRows;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="clonefest-users-${
          new Date().toISOString().split("T")[0]
        }.csv"`
      );
      res.status(200).send(csv);
    } else {
      res.status(200).json({
        message: "Users exported successfully.",
        totalUsers: users.length,
        exportedAt: new Date().toISOString(),
        users,
      });
    }
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ message: "Failed to export users." });
  }
}

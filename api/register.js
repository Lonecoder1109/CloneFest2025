import admin from "firebase-admin";
import bcrypt from "bcryptjs";

// Initialize Firebase Admin SDK
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

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      teamName,
      teamPassword,
      teamLeader,
      teamMembers = [],
    } = req.body;

    // Basic validation
    if (
      !teamName?.trim() ||
      !teamPassword?.trim() ||
      !teamLeader?.fullName?.trim() ||
      !teamLeader?.USN?.trim() ||
      !teamLeader?.email?.trim() ||
      !teamLeader?.phone?.trim() ||
      !teamLeader?.github?.trim() ||
      !teamMembers[0]?.fullName?.trim() ||
      !teamMembers[0]?.USN?.trim() ||
      !teamMembers[0]?.email?.trim() ||
      !teamMembers[1]?.fullName?.trim() || 
      !teamMembers[1]?.USN?.trim() ||
      !teamMembers[1]?.email?.trim()
    ) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Check if team already exists
    const existing = await db
      .collection("teams")
      .where("teamName", "==", teamName.trim())
      .get();

    if (!existing.empty) {
      return res.status(400).json({ message: "Team name already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(teamPassword.trim(), 10);

    // Store team with hashed password
    await db.collection("teams").add({
      teamName: teamName.trim(),
      teamPassword: hashedPassword,
      teamLeader: {
        fullName: teamLeader.fullName.trim(),
        USN: teamLeader.USN.trim(),
        email: teamLeader.email.trim(),
        phone: teamLeader.phone.trim(),
        github: teamLeader.github.trim(),
      },
      teamMembers: teamMembers.map((m) => ({
        fullName: m.fullName?.trim() || "",
        USN: m.USN?.trim() || "",
        email: m.email?.trim() || "",
      })),
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: "Team registered successfully." });
  } catch (error) {
    console.error("Team registration error:", error);
    return res.status(500).json({ message: "Server error occurred." });
  }
}

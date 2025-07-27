import admin from "firebase-admin";
import bcrypt from "bcryptjs";

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
    const { teamName, teamPassword } = req.body;

    if (!teamName || !teamPassword) {
      return res.status(400).json({ message: "Team name and password are required." });
    }

    const teamSnapshot = await db
      .collection("teams")
      .where("teamName", "==", teamName.trim())
      .get();

    if (teamSnapshot.empty) {
      return res.status(401).json({ message: "Invalid team name or password." });
    }

    const teamDoc = teamSnapshot.docs[0];
    const teamData = teamDoc.data();

    const passwordMatch = await bcrypt.compare(teamPassword, teamData.teamPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid team name or password." });
    }

    return res.status(200).json({
      message: "Login successful.",
      team: {
        teamName: teamData.teamName,
        teamLeader: teamData.teamLeader,
        teamMembers: teamData.teamMembers,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error occurred." });
  }
}

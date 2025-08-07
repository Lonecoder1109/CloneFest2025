import admin from "firebase-admin";

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

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

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

    const snapshot = await db.collection("teams").get();
    const teams = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      teams.push({
        id: doc.id,
        teamName: data.teamName,
        teamPassword: data.teamPassword,
        teamLeaderFullName: data.teamLeader?.fullName || "",
        teamLeaderUSN: data.teamLeader?.USN || "",
        teamLeaderEmail: data.teamLeader?.email || "",
        teamLeaderPhone: data.teamLeader?.phone || "",
        teamLeaderGithub: data.teamLeader?.github || "",

        member1FullName: data.teamMembers?.[0]?.fullName || "",
        member1USN: data.teamMembers?.[0]?.USN || "",
        member1Email: data.teamMembers?.[0]?.email || "",

        member2FullName: data.teamMembers?.[1]?.fullName || "",
        member2USN: data.teamMembers?.[1]?.USN || "",
        member2Email: data.teamMembers?.[1]?.email || "",

        member3FullName: data.teamMembers?.[2]?.fullName || "",
        member3USN: data.teamMembers?.[2]?.USN || "",
        member3Email: data.teamMembers?.[2]?.email || "",

        createdAt: data.createdAt,
      });
    });

    const format = req.query.format || "json";

    if (format === "csv") {
      const csvHeader =
        "ID,Team Name,Team Password,Leader Name,Leader Email,Leader Phone,Leader GitHub,Member 1 Name,Member 1 USN,Member 1 Email,Member 2 Name,Member 2 USN,Member 2 Email,Member 3 Name,Member 3 USN,Member 3 Email,Created At\n";

      const csvRows = teams
        .map((team) =>
          `"${team.id}","${team.teamName}","${team.teamPassword}","${team.teamLeaderFullName}","${team.teamLeaderEmail}","${team.teamLeaderPhone}","${team.teamLeaderGithub}","${team.member1FullName}","${team.member1USN}","${team.member1Email}","${team.member2FullName}","${team.member2USN}","${team.member2Email}","${team.member3FullName}","${team.member3USN}","${team.member3Email}","${team.createdAt}"`
        )
        .join("\n");

      const csv = csvHeader + csvRows;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="clonefest-teams-${new Date()
          .toISOString()
          .split("T")[0]}.csv"`
      );
      return res.status(200).send(csv);
    } else {
      return res.status(200).json({
        message: "Teams exported successfully.",
        totalTeams: teams.length,
        exportedAt: new Date().toISOString(),
        teams,
      });
    }
  } catch (error) {
    console.error("Export error:", error);
    return res.status(500).json({ message: "Failed to export teams." });
  }
}

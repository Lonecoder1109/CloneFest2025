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
        teamLeaderEmail: data.teamLeader?.email || "",
        teamLeaderPhone: data.teamLeader?.phone || "",
        teamLeaderGithub: data.teamLeader?.github || "",
        member1: data.teamMembers?.[0]?.fullName || "",
        member2: data.teamMembers?.[1]?.fullName || "",
        member3: data.teamMembers?.[2]?.fullName || "",
        createdAt: data.createdAt,
      });
    });

    const format = req.query.format || "json";

    if (format === "csv") {
      const csvHeader =
        "ID,Team Name,Team Password,Leader Name,Leader Email,Leader Phone,Leader GitHub,Member 1,Member 2,Member 3,Created At\n";

      const csvRows = teams
        .map(
          (team) =>
            `"${team.id}","${team.teamName}","${team.teamPassword}","${team.teamLeaderFullName}","${team.teamLeaderEmail}","${team.teamLeaderPhone}","${team.teamLeaderGithub}","${team.member1}","${team.member2}","${team.member3}","${team.createdAt}"`
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

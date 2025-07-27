import admin from "firebase-admin";
import { config } from "dotenv";

// Load environment variables
config();

// Test Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Test write
async function testFirestore() {
  try {
    await db.collection("test").add({
      message: "Firebase setup working!",
      timestamp: new Date().toISOString(),
    });
    console.log("✅ Firebase Admin SDK working!");
    console.log("✅ Project ID:", process.env.FIREBASE_PROJECT_ID);
    process.exit(0);
  } catch (error) {
    console.error("❌ Firebase setup error:", error);
    process.exit(1);
  }
}

testFirestore();

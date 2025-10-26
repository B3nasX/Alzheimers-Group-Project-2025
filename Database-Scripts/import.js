// import.js
const fs = require("fs");
const csv = require("csv-parser");
const admin = require("firebase-admin");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

// Change this to your desired collection name
const collectionName = "patient_health_data"; // e.g., "products", "customers", etc.

const results = [];

fs.createReadStream("dementia_patients_health_data.csv") // Replace with your CSV file name
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    console.log(`Uploading ${results.length} records to Firestore...`);

    const batch = db.batch();
    results.forEach((row) => {
      // Create a new document with auto ID (or use your own, e.g. row.id)
      const docRef = db.collection(collectionName).doc();
      batch.set(docRef, row);
    });

    await batch.commit();
    console.log("Upload complete!");
  });

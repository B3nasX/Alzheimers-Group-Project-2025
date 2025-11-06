const fs = require("fs");
const csv = require("csv-parser");
const admin = require("firebase-admin");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

const collectionName = "patient_health_data"; 

const results = [];

fs.createReadStream("dementia_patients_health_data.csv") 
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    console.log("Uploading ${results.length} records to Firestore...");

    const batch = db.batch();
    results.forEach((row) => {
      const docRef = db.collection(collectionName).doc();
      batch.set(docRef, row);
    });

    await batch.commit();
    console.log("Upload complete!");
  });

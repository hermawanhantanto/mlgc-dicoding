const { Firestore } = require("@google-cloud/firestore");
const path = require("path");

async function storeData(data, id) {
  const db = new Firestore({
    databaseId: process.env.DATABASE_ID,
    projectId: process.env.PROJECT_ID,
    keyFilename: path.resolve(__dirname, "../../key.json"),
  });
  const predictionCollection = db.collection("predictions");
  console.log(predictionCollection);
  return predictionCollection.doc(id).set(data);
}

async function getData() {
  const db = new Firestore({
    databaseId: process.env.DATABASE_ID,
    projectId: process.env.PROJECT_ID,
    keyFilename: path.resolve(__dirname, "../../key.json"),
  });
  const predictionCollection = db.collection("predictions");

  const snapshot = await predictionCollection.get();

  const result = [];

  snapshot.forEach((doc) => {
    let data = {
      id: doc.id,
      history: {
        result: doc.data().result,
        createdAt: doc.data().createdAt,
        suggestion: doc.data().suggestion,
        id: doc.data().id,
      },
    };
    result.push(data);
  });

  return result;
}

module.exports = { storeData, getData };

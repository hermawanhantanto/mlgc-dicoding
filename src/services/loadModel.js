const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  const model = await tf.loadGraphModel(process.env.STORAGE_URL);
  return model;
}

module.exports = loadModel;

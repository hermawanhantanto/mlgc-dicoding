const crypto = require("crypto");
const predictClass = require("../services/inference");
const { storeData, getData } = require("../services/storeData");

async function predictHandler(request, h) {
  const { image } = request.payload;

  const { model } = request.server.app;

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const { label, suggestion } = await predictClass(model, image);

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };

  await storeData(data, id);

  return h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    })
    .code(201);
}

async function getPredictHistoriesHandler() {
  const data = await getData();

  return {
    status: "success",
    data,
  };
}

module.exports = {
  predictHandler,
  getPredictHistoriesHandler,
};

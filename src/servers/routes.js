const { predictHandler, getPredictHistoriesHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/predict",
    handler: predictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    method: "GET",
    path: "/predict/histories",
    handler: getPredictHistoriesHandler,
  },
];

module.exports = routes;

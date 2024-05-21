const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const InputError = require("../exceptions/InputError");
const dotenv = require("dotenv");
const loadModel = require("../services/loadModel");

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response instanceof InputError) {
      return h
        .response({
          status: "fail",
          message: response.message,
        })
        .code(response.statusCode);
    }

    if (response.isBoom) {
      return h
        .response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        })
        .code(413);
    }

    return h.continue;
  });

  const model = await loadModel();

  server.app = {
    model,
  };

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

init();

const path = require("path");
const express = require("express");

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

let useFolder;
console.log("NODE_ENV: ", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  useFolder = "/public/";
  const webpack = require("webpack");
  const config = require("../webpack.config.development");
  const compiler = webpack(config);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      hot: true
    })
  );
  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
} else {
  useFolder = "/dist/";
}
app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, ".." + useFolder + "index.html"));
});

app.get("/api/data", (req, res) => {
  res.send("hi from server"); // replace me with real data
});

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log("Listening at port: ", port);
});

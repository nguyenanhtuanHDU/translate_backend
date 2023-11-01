require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
// const translate = require("translate");
const translate = require("translate-google");
const http = require("http");
const app = express();
app.use(cookieParser());

const server = http.createServer(app);
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// const apiRoute = require("./src/routes/api");
// const authRoute = require("./src/routes/auth");
app.post("/test", async (req, res) => {
  const { text } = req.body;
  let textTranslate = await translate(text, { to: "fr" });
  //   translate(text, { to: "en" })
  //     .then((res) => {
  //       console.log(res);
  //       textTranslate = res;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  res.status(200).json({
    data: textTranslate,
  });
});

// app.use(express.static(path.join('./src', 'public')));
// app.use("/v1/api", apiRoute);
// app.use("/auth", authRoute);

(async () => {
  try {
    server.listen(port, hostname, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`🚀 ~ error:`, error);
  }
})();

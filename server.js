const app = require("./app");
const mongoose = require("mongoose");
const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL)
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.log(err));

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server started at Port ${process.env.SERVER_PORT}, visit http://localhost:${process.env.SERVER_PORT}/ for shortning the url`,
  ),
);

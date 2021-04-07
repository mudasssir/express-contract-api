import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import dotenv from "dotenv/config.js";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/referral", router);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

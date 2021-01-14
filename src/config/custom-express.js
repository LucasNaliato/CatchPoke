const db = require("../data/db.js");
const consign = require("consign");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(db, (err) => {
  console.log(err);
});

app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", "src/views");

consign().include("src/routes").then("src/controllers").into(app);

module.exports = app;

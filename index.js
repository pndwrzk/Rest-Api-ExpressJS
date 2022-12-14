const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const routes = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

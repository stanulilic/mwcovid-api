const express = require("express");
const cors = require("cors");
const {
  getLocalCovidData,
  saveCountryData,
  saveDistrictData,
} = require("./auto-queries.js");
const db = require("./queries.js");
const cron = require("node-cron");
const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3001" }));
app.get("/api/national/all", db.getCountryData);
app.get("/api/national/all/:id", db.getAllCountryData);
app.get("/api/districts/", db.getDistrictsData);
app.get("/api/districts/:district_name", db.getDataByDistrictName);
app.get("/api/districts/:district_name/all", db.getAllDataByDistrictName);
app.get("/api/districts/:district_name/all/:id", db.filterDataByDistrictName);

/* 59 21 is 23:59 in malawi*/
cron.schedule("59 21 * * *", function () {
  saveCountryData();
  saveDistrictData();
});

app.listen(port, () => console.log(`Covid API listening on ${port}!`));

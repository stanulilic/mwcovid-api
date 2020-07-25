const { pool } = require("./auto-queries.js");

const getCountryData = (request, response) => {
  pool.query("SELECT * FROM nationaldata", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getRecentCountryData = (request, response) => {
  pool.query(
    "SELECT * FROM nationaldata ORDER BY id DESC LIMIT 1",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllCountryData = (request, response) => {
        const limit = parseInt(request.params.id);
        pool.query(
                "SELECT * FROM nationaldata ORDER BY id DESC LIMIT $1", [limit], (error, results) => {
                        if(error) {
                                throw error;
                        }
                        response.status(200).json(results.rows);
                }
        );
}

const getDistrictsData = (request, response) => {
  pool.query(
    "SELECT districtgeolocationlat,districtGeolocationlng,districtName,numberOfConfirmedCases,numberOfConfirmedDeaths,numberOfRecoveredPatients,numberOfSuspectedCases, dateadded  FROM districtdata GROUP BY dateadded,  districtgeolocationlat,districtGeolocationlng,districtName,numberOfConfirmedCases,numberOfConfirmedDeaths,numberOfRecoveredPatients,numberOfSuspectedCases ORDER BY dateadded",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getRecentDistrictsData = (request, response) => {
  const today = new Date();
  const date = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  // format date as: 2020-05-30
  const fullDate = `${year}-${month <= 9 ? `0${month}` : month}-${date}`;
  pool.query(
    "SELECT * FROM districtdata where dateadded::date =$1",
    [fullDate],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getCountryData,
  getRecentCountryData,
  getDistrictsData,
  getRecentDistrictsData,
  getAllCountryData
};

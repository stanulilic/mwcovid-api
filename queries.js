const { pool } = require("./auto-queries.js");

const getCountryData = (request, response) => {
  pool.query(
    "SELECT * FROM nationaldata ORDER BY id DESC",
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
    "SELECT district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,number_of_confirmed_deaths,number_of_recovered_patients,number_of_suspected_cases, date_added  FROM districtdata GROUP BY date_added,  district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,number_of_confirmed_deaths,number_of_recovered_patients,number_of_suspected_cases ORDER BY date_added",
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
    "SELECT * FROM districtdata where date_added::date =$1",
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
  getDistrictsData,
  getRecentDistrictsData,
  getAllCountryData
};

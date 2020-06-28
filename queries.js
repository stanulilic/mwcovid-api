const { pool } = require('./auto-queries.js');

const getCountryData = (request, response) => {
        pool.query('SELECT * FROM nationaldata', (error, results) => {
                if(error) {
                        throw error;
                }
                response.status(200).json(results.rows);
        });
};

module.exports = { getCountryData };

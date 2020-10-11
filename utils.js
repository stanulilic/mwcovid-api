const camelcaseKeys = require('camelcase-keys');

function nestGeolocationData(rows) {
      jsondata = JSON.stringify(camelcaseKeys(rows))
      data = JSON.parse(jsondata)
      districts = data.map(district => {
              const districtGeolocation = {
                          "lat": district.districtGeolocationlat,
                          "lng": district.districtGeolocationlng
                        }
              district['districtGeolocation'] = districtGeolocation;
              delete district.districtGeolocationlat;
              delete district.districtGeolocationlng;
              return district;
     })
     return districts
}

module.exports = {nestGeolocationData};

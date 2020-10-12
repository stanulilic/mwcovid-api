const camelcaseKeys = require("camelcase-keys");

function nestGeolocationData(rows) {
  jsondata = JSON.stringify(camelcaseKeys(rows));
  data = JSON.parse(jsondata);
  districts = data.map((district) => {
    const districtGeolocation = {
      lat: district.districtGeolocationlat,
      lng: district.districtGeolocationlng,
    };
    district["districtGeolocation"] = districtGeolocation;
    delete district.districtGeolocationlat;
    delete district.districtGeolocationlng;
    return district;
  });
  return districts;
}

const toTitleCase = (phrase) => {
  const split_value = phrase.includes("-") ? "-" : " ";
  return phrase
    .toLowerCase()
    .split(split_value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

module.exports = { nestGeolocationData, toTitleCase };

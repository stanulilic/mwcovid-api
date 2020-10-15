# Malawi Covid App.

This is an API created with Node(Express) and PostgreSQL database.

It gives you access to daily covid19 updates for the whole country Malawi and also each district in Malawi.

## Endpoints

### /api/national/all

Country cases sorted by date added. It starts with the recent date.

##### Example

````
$ curl https://covid.malawianic.com/api/national/all/```
````

```
[{
"id": 134,
"numberOfConfirmedCases": 5821,
"numberOfConfirmedDeaths": 180,
"numberOfRecoveredPatients": 4647,
"numberOfSuspectedCases": 56268,
"numberOfReceivedSamples": 56268,
"numberOfTestedSamples": 56135,
"dateAdded": "2020-10-12T00:00:00.000Z"
},
....]
```

##### Subresources

| Methods | Path                      | Description                          |
| ------- | ------------------------- | ------------------------------------ |
| GET     | /api/national/all/{limit} | limit the number of results returned |

### /api/districts

Recent cases per district in Malawi.

##### Example

```
$ curl https://covid.malawianic.com/api/districts/
```

```
[{
"districtName": "Nsanje",
"numberOfConfirmedCases": 37,
"numberOfConfirmedDeaths": 1,
"numberOfRecoveredPatients": 31,
"numberOfSuspectedCases": 0,
"dateAdded": "2020-10-14T00:00:00.000Z",
"districtGeolocation": {
"lat": "-16.9205934",
"lng": "35.2533040"
}
},
{
"districtName": "Muloza border",
"numberOfConfirmedCases": 0,
"numberOfConfirmedDeaths": 0,
"numberOfRecoveredPatients": 0,
"numberOfSuspectedCases": 0,
"dateAdded": "2020-10-14T00:00:00.000Z",
"districtGeolocation": {
"lat": "-16.0770120",
"lng": "35.7375120"
}}
...]

```

##### Subresources

| Methods | Path                              | Description                           |
| ------- | --------------------------------- | ------------------------------------- |
| GET     | /api/districts/{name}             | recent cases for a district           |
| GET     | /api/districts/{name}/all         | all cases for the district            |
| GET     | /api/districts/{name}/all/{limit} | limit cases returned for the district |

## Usage

1. Clone the repository.

```
git clone https://github.com/stanulilic/stanleyulili.com.git
```

2. Install dependencies

```
npm install
```

3. Install PostgreSQL on your system.

4. Create a user for a database.

```
CREATE ROLE coviduser WITH LOGIN PASSWORD 'password';
```

5. Create a database.

```
CREATE DATABASE covid;
```

You can request for a database dump from me and load the data into the database.

6. Update your credentials in `auto-queries.js` if you created a user with different credentials.

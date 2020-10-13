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
[
{
"id": 134,
"numberOfConfirmedCases": 5821,
"numberOfConfirmedDeaths": 180,
"numberOfRecoveredPatients": 4647,
"numberOfSuspectedCases": 56268,
"numberOfReceivedSamples": 56268,
"numberOfTestedSamples": 56135,
"dateAdded": "2020-10-12T00:00:00.000Z"
},
....
]
```

##### Subresources

| Methods | Path                      | Description                     |
| ------- | ------------------------- | ------------------------------- |
| GET     | /api/national/all/{limit} | country cases with limited rows |

# CUDOS Stats Service

## Starting the service:

Create ```.env``` file in the root project directory and inside configure ```HASURA_URL``` variable:\
```HASURA_URL=http://34.122.182.3:8080/v1/graphql```

Build the docker image:\
```docker build -t 'cudos-stats-service' .```

Run the docker image:\
```docker run -d --name cudos-stats-service -p 3001:3000 cudos-stats-service```

## Available endpoints:
http://127.0.0.1:3001/supply?explorer=cmc - coinmarketcap endpoint that is returning current circulating supply as decimal.

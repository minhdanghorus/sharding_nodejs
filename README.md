# Init project
```bash
npm init -y
```

# Pre-requisites
```bash
docker build -t pgshard .
docker run --name pgshard1 -e POSTGRES_PASSWORD=postgres -d -p 5434:5434 pgshard
docker run --name pgshard2 -e POSTGRES_PASSWORD=postgres -d -p 5435:5435 pgshard
docker run --name pgshard3 -e POSTGRES_PASSWORD=postgres -d -p 5436:5436 pgshard
```



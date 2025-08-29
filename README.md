# Init project
```bash
npm init -y
```

# Pre-requisites
```bash
docker build -t pgshard .
docker run --name pgshard1 -e POSTGRES_PASSWORD=postgres -d -p 5434:5432 pgshard
docker run --name pgshard2 -e POSTGRES_PASSWORD=postgres -d -p 5435:5432 pgshard
docker run --name pgshard3 -e POSTGRES_PASSWORD=postgres -d -p 5436:5432 pgshard
```

# Install dependencies
```bash
npm install express pg consistent-hash crypto
```

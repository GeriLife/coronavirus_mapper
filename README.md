# Coronavirus mapper
Collecting self-reported coronavirus symptoms and displaying them on a real-time map.

## Development

### PostGIS
This project relies on PostGIS. You can install PostGIS locally using Docker:

> docker run --name coronavirus-mapper-postgis -e POSTGRES_PASSWORD=secretpassword -d postgis/postgis

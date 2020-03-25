# Coronavirus mapper
Collecting self-reported coronavirus symptoms and displaying them on a real-time map.

## Development

### Localization
Django uses GNU Gettext for localization. In order to generate localization files, you will need to install gettext on your computer.

#### OS X

```
brew install gettext
```

#### Ubuntu/Debian Linux

```
sudo apt-get install gettext
```

#### Windows
Download a [precompiled gettext binary](https://mlocati.github.io/articles/gettext-iconv-windows.html).

### PostGIS
This project relies on PostGIS. You can install PostGIS locally using Docker. Run the following command in this project root.

```
docker-compose up
```
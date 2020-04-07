// user location point
// changes position when user clicks on map
var userLocationPoint = new ol.geom.Point([0, 0]);

function initializeReportModalMap() {
    // remove any old location map
    // to prevent duplicate remder
    $('#id_location_map').empty();

    var reportMap = new ol.Map({
        target: 'id_location_map',
        layers: [
            // OSM base map
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            // User location layer
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [
                        new ol.Feature({
                            geometry: userLocationPoint
                        }),
                    ]
                }),
            }),
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 1
        })
    });

    reportMap.on('click', function (event) {
        // anonymize location by reducing precision
        var anonymizedLocation = anonymizeLocation(event.coordinate);

        // update location marker position
        userLocationPoint.setCoordinates(anonymizedLocation);
    });
}

// Make sure location map renders correctly in modal
$('#reportModal').on('shown.bs.modal', function () {
    initializeReportModalMap();
});

$('#reportForm').submit(function (event) {
    event.preventDefault();

    // format field data for sending to server
    var firstSymptomatic = moment(firstSymptomaticField.selectedDates[0]).format('YYYY-MM-DD');
    var coordinates = userLocationPoint.getCoordinates().map(function (coordinate) {
        return parseFloat(coordinate);
    });

    var reportData = {
        first_symptomatic: firstSymptomatic,
        location: {
            "type": "Point",
            "coordinates": coordinates,
        },
    };

    jQuery.ajax({
        url: "/reports/reports_json/",
        type: "POST",
        data: JSON.stringify(reportData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            window.location.reload();
        },
        error: function (error) {
            console.log(error);
        }
    });
});

/*
Anonymize the location data
by reducing decimal degree precision
*/
function anonymizeLocation(lonLat) {
    var precision = 3;

    // Reduce coordinate accuracy for anonymization
    return lonLat.map(function (coordinate) {
        // how may decimal points to keep
        // fewer is less precise
        return coordinate.toFixed(precision)
    });
}
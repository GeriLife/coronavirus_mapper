// Add calendar widget to "first symptomatic" field
// default to today for convenience
// don't allow "future" reports
var firstSymptomaticField = flatpickr("#id_first_symptomatic", {
    defaultDate: 'today',
    maxDate: 'today',
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: [0, 0],
        projection: 'EPSG:4326',
        zoom: 1
    })
});

jQuery.ajax("/reports/reports_json/", {
    success: function (reports) {
        // Add report markers to map
        var reportFeatures = reports.features.map(function (report) {
            var reportPoint = new ol.geom.Point(report.geometry.coordinates);

            return new ol.Feature(reportPoint);
        });

        var source = new ol.source.Vector({
            features: reportFeatures,
        });

        var clusterSource = new ol.source.Cluster({
            source: source,
            distance: 40,
        });

        var clusterLayer = new ol.layer.Vector({
            source: clusterSource,
        });

        map.addLayer(clusterLayer);
    }
});


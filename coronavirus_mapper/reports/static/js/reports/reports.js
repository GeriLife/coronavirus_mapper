// Style constants
var reportPointFill = new ol.style.Fill({
    color: 'rgba(255, 153, 0, 0.8)'
});
var reportPointStroke = new ol.style.Stroke({
    color: 'rgba(255, 204, 0, 0.2)',
    width: 1
});
var textFill = new ol.style.Fill({
    color: '#fff'
});
var textStroke = new ol.style.Stroke({
    color: 'rgba(0, 0, 0, 0.6)',
    width: 3
});
var invisibleFill = new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.01)'
});

function createReportPointStyle(feature) {
    return new ol.style.Style({
        geometry: feature.getGeometry(),
        image: new ol.style.Circle({
            radius: 3,
            fill: reportPointFill,
            stroke: reportPointStroke
        })
    });
}

var maxFeatureCount = 0;
// placeholder for cluster layer
// to share across function scope
var clusterLayer = null;

var calculateClusterInfo = function (resolution) {
    var clusters = clusterLayer.getSource().getFeatures();

    clusters.forEach(function (cluster) {
        var features = cluster.get('features');

        var featureCount = features.length;
        maxFeatureCount = Math.max(maxFeatureCount, featureCount);

        var extent = ol.extent.createEmpty();

        features.forEach(function (feature) {
            var featureExtent = feature.getGeometry().getExtent();

            ol.extent.extend(extent, featureExtent);

        });

        var featuresExtent = ol.extent.getWidth(extent) + ol.extent.getHeight(extent);

        var radius = 0.25 * featuresExtent / resolution;

        cluster.set('radius', radius);
    });
};

var currentResolution;
function chooseClusterLayerStyle(feature, resolution) {
    if (resolution != currentResolution) {
        calculateClusterInfo(resolution);
        currentResolution = resolution;
    }

    var reportCount = feature.get('features').length;

    if (reportCount > 1) {
        var proportionalCount = reportCount / maxFeatureCount;

        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: new ol.style.Fill({
                    color: [255, 153, 0, Math.min(0.8, 0.4 + proportionalCount)]
                })
            }),
            text: new ol.style.Text({
                text: reportCount.toString(),
                fill: textFill,
                stroke: textStroke
            })
        });
    }

    var originalFeature = feature.get('features')[0];

    // Default to single point style
    return createReportPointStyle(originalFeature);
}

function selectInteractionFeatureStyle(feature) {
    var styles = [
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: invisibleFill
            })
        })
    ];

    var originalFeatures = feature.get('features');

    originalFeatures.forEach(function (feature) {
        var featureStyle = createReportPointStyle(feature);

        styles.push(featureStyle);
    });

    return styles;
}


var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    interactions: ol.interaction.defaults().extend([
        new ol.interaction.Select({
            condition: function (event) {
                return event.type == 'pointermove' ||
                    event.type == 'singleclick';
            },
            style: selectInteractionFeatureStyle
        })
    ]),
    view: new ol.View({
        center: [0, 0],
        projection: 'EPSG:4326',
        zoom: 1
    })
});

function prepareClusterLayer(reports) {
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
        distance: 33,
    });

    return new ol.layer.Vector({
        source: clusterSource,
        style: chooseClusterLayerStyle
    });
}

jQuery.ajax("/reports/reports_json/", {
    success: function (reports) {
        clusterLayer = prepareClusterLayer(reports);

        map.addLayer(clusterLayer);
    }
});


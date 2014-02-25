
var map = new ga.Map({
  target: 'map',
   view: new ol.View2D({
   resolution: 50,
   center: [650000, 260000]
  })
});

var lyr1 = ga.layer.create('ch.swisstopo.pixelkarte-farbe');

map.addLayer(lyr1);

var vector1 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:21781',
    url: '../data/JuraparkAG.kml'
  })
});
map.addLayer(vector1);

var vector2 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:21781',
    url: '../data/JPPCP-Peaks.kml',
	tooltip: 'Hello, world!'
  })
});
map.addLayer(vector2,true);


var findFeatures = function(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  });
  return features;
};

var displayFeatureInfo = function(pixel, coordinate) {
  var features = findFeatures(pixel);
  var element = popup.getElement();
  var feature = features[0];
  if (feature) {
     $(element).popover('destroy');
     popup.setPosition(coordinate);
     $(element).popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': feature.get('description')
     });
     $(element).popover('show');
  } else {
     $(element).popover('destroy');
  }
};

map.on('singleclick', function(evt) {
  var pixel = evt.pixel;
  var coordinate = evt.coordinate;
  displayFeatureInfo(pixel, coordinate);
});
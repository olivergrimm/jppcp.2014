var gpsstyle1 = {
  'LineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'violet',
      width: 3
    })
  })],
  'MultiLineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'violet',
      width: 3
    })
  })]
};
var raster = new ol.layer.Tile({
  source: new ol.source.BingMaps({
    imagerySet: 'Aerial',
    //key: 'ArtKw7Y9TNFeUql4ZdTpVuEhIOw0cDuLDDStcNt5v8nblauZ_MO63Gwt6Cn6-UU-'  //dev key
	key: 'AvFPnBPpgMk5e4WoIwX91jb0awMF1woIGZ5wphhdyFPG0oCtx7XFxSqCzW5ummZm' //prod key
	})
});

var vector1 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:3857',
    url: 'data/JuraparkAG.kml'
  })
});

var vector2 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:3857',
    url: 'data/JPPCP-Peaks.kml'
  })
});
var gpx1 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140302.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx2 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140309.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx3 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:4326',
    url: 'data/tracs/trac20140316.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx4 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140330.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx5 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140406.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx6 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140409.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx7 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140413.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var gpx8 = new ol.layer.Vector({
  source: new ol.source.GPX({
    projection: 'EPSG:3857',
    url: 'data/tracs/trac20140501.gpx'
  }),
  style: function(feature, resolution) {
    return gpsstyle1[feature.getGeometry().getType()];
  }
});
var map = new ol.Map({
  layers: [raster,vector1,vector2,gpx1,gpx2,gpx3,gpx4,gpx5,gpx6,gpx7,gpx8],
  renderer: 'canvas',
  target: document.getElementById('map'),
  view: new ol.View2D({
    center: [898000, 6016807],
    zoom: 12
  })
});

var displayFeatureInfo = function(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  });
  if (features.length > 0) {
    var info = [];
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
    map.getTarget().style.cursor = 'pointer';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
    map.getTarget().style.cursor = '';
  }
};

$(map.getViewport()).on('mousemove', function(evt) {
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('singleclick', function(evt) {
  displayFeatureInfo(evt.pixel);
});





/////////////////////
/*var map = new ol.Map({
  target: 'map',
   view: new ol.View2D({
   resolution: 50,
   center: [650000, 260000]
  })
});*/

/*var styles = [
  'Road',
  'Aerial',
  'AerialWithLabels',
  'collinsBart',
  'ordnanceSurvey'
];
var lyr1 = [];
var i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
  lyr1.push(new ol.layer.Tile({
    visible: false,
    preload: Infinity,
    source: new ol.source.BingMaps({
      key: 'ArtKw7Y9TNFeUql4ZdTpVuEhIOw0cDuLDDStcNt5v8nblauZ_MO63Gwt6Cn6-UU-',
	  //key: 'AvFPnBPpgMk5e4WoIwX91jb0awMF1woIGZ5wphhdyFPG0oCtx7XFxSqCzW5ummZm',
      imagerySet: styles[i]
    })
  }));
}*/
//var lyr1 = ga.layer.create('ch.swisstopo.pixelkarte-farbe');

//map.addLayer(lyr1);
/*
var vector1 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:21781',
    url: 'data/JuraparkAG.kml'
  })
});
map.addLayer(vector1);

var vector2 = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: 'EPSG:21781',
    url: 'data/JPPCP-Peaks.kml'
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
var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  });
  if (features.length > 0) {
    var info = [];
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
    //map.getTarget().style.cursor = 'pointer';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
    //map.getTarget().style.cursor = '';
  }
};

$(map.getViewport()).on('mousemove', function(evt) {
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('singleclick', function(evt) {
  displayFeatureInfo(evt.pixel);
});*/
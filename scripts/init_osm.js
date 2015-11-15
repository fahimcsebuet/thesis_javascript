map = new OpenLayers.Map("OSM_Map");
map.addLayer(new OpenLayers.Layer.OSM());
var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);
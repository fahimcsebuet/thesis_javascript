map = new OpenLayers.Map("OSM_Map");
map.addLayer(new OpenLayers.Layer.OSM());
var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

ourpoint1 = new OpenLayers.LonLat(90.3989,23.7937);
ourpoint1.transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject());
map.setCenter(ourpoint1,12);
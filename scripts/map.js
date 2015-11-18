
function Map(div) {
    this.div = div;
    this.midpoint = {};
    this.zoom = {};
    this.osm_map = {};
    this.markers = {};

    this.select_source=1;
	this.select_dest=0;
	this.s_lat = {};
	this.s_lon = {};
	this.d_lat = {};
	this.d_lon = {};
};
 
Map.prototype.initOSM= function() {
    this.osm_map = new OpenLayers.Map(this.div);
	this.osm_map.addLayer(new OpenLayers.Layer.OSM());
	this.markers = new OpenLayers.Layer.Markers( "Markers" );
	this.osm_map.addLayer(this.markers);

};

Map.prototype.setMidPoint = function(x,y,zoom) {
	this.zoom = zoom;
    this.midpoint= new OpenLayers.LonLat(x,y);
	this.midpoint.transform(new OpenLayers.Projection("EPSG:4326"),this.osm_map.getProjectionObject());
	this.osm_map.setCenter(this.midpoint,this.zoom);
};


Map.prototype.plotOSMLine = function(linestring,style) {
	vector = new OpenLayers.Layer.Vector();
	var featureVector = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString(linestring).transform(
				new OpenLayers.Projection("EPSG:4326"), 
				new OpenLayers.Projection("EPSG:900913")
			),null,style
		);
	
	vector.addFeatures([featureVector]);
	this.osm_map.addLayers([vector]);
};

Map.prototype.createLineString = function(data) {
	 linestring = new Array();
	 var length = data[0].length;
	 for(i=0;i<length;i++)
	 {
	  		linestring[i] = new OpenLayers.Geometry.Point(data[1][data[0][i]],data[2][data[0][i]]);
			
	 }
	 return linestring;
};

Map.prototype.getSampleDataforLineString = function() {
	result= new Array();
	result[0] = new Array();
	result[1] = new Array();
	result[2] = new Array();

	result[0][0] = "1778185456";
	result[1][result[0][0]] = "90.4179973";
	result[2][result[0][0]] = "23.7105191";

	result[0][1] = "1778185464";
	result[1][result[0][1]] = "90.4197997";
	result[2][result[0][1]] = "23.7063736";

	return result
};

Map.prototype.getSampleStyle = function() {
	var style = {
		strokeColor: '#0000ff',
		strokeOpacity: 0.8,
		strokeWidth: 4
	};

	return style
};


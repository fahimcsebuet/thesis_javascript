
function Map(div) {
    this.div = div;
    this.midpoint = -1;
    this.zoom = -1;
    this.osm_map = -1;
    this.markers = -1;
    this.vector = -1;

    this.select_source=1;
	this.select_dest=0;
	this.s_lat = -1;
	this.s_lon = -1;
	this.d_lat = -1;
	this.d_lon = -1;
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

Map.prototype.createLineString = function(data) {
	 linestring = new Array();
	 var length = data[0].length;
	 for(i=0;i<length;i++)
	 {
	  		linestring[i] = new OpenLayers.Geometry.Point(data[1][data[0][i]],data[2][data[0][i]]);

	 }
	 return linestring;
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

    this.vector = vector;
};

Map.prototype.plotResult = function(data,style) {

    linestring = this.createLineString(data);
    this.plotOSMLine(linestring,style);

};

Map.prototype.runSample = function(){
        sampledata = this.getSampleDataforLineString();
        samplestyle = this.getSampleStyle();
        this.plotResult(sampledata,samplestyle);
};

Map.prototype.clearMap= function() {

    this.markers.clearMarkers();
    this.select_source=1;
	this.select_dest=0;
	this.s_lat = -1;
	this.s_lon = -1;
	this.d_lat = -1;
	this.d_lon = -1;

    try{
        this.osm_map.removeLayer(this.vector);
    }
    catch(err){
        console.log("line layer not found");
    }


};


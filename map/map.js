
function Map(div) {
    this.div = div;
    this.midpoint = -1;
    this.zoom = -1;
    this.osm_map = -1;
    this.markers = -1;
    this.vectors = [];

    this.select_source=1;
	this.select_dest=0;
	this.s_lat = -1;
	this.s_lon = -1;
	this.d_lat = -1;
	this.d_lon = -1;
	this.a_lat = -1;
	this.a_lon = -1;
	
	this.source_node = -1;
	this.destination_node = -1;
	this.alter_node = -1;
	
	this.alter_path_select = false;
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
	 var linestring = new Array();
	 var length = data[0].length;
	 for(i=0;i<length;i++)
	 {
	  		linestring[i] = new OpenLayers.Geometry.Point(data[1][data[0][i]],data[2][data[0][i]]);

	 }
	 return linestring;
};


Map.prototype.plotOSMLine = function(linestring,style) {
	var vector = new OpenLayers.Layer.Vector();
	var featureVector = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString(linestring).transform(
				new OpenLayers.Projection("EPSG:4326"), 
				new OpenLayers.Projection("EPSG:900913")
			),null,style
		);
	
	vector.addFeatures([featureVector]);
	this.osm_map.addLayers([vector]);

    this.vectors.push(vector);
};

Map.prototype.plotResult = function(data,style) {

    var linestring = this.createLineString(data);
    this.plotOSMLine(linestring,style);

};

Map.prototype.addMarker = function(lon,lat) {

	var ourpoint2 = new OpenLayers.LonLat(lon,lat);
	ourpoint2.transform(new OpenLayers.Projection("EPSG:4326" ),this.osm_map.getProjectionObject());
				 
	this.markers.addMarker(new OpenLayers.Marker(ourpoint2));

};

Map.prototype.runSample = function(){
        var sampledata = this.getSampleDataforLineString();
        var samplestyle = this.getSampleStyle();
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
        var index;
        for	(index = 0; index < this.vectors.length; index++) {
                this.osm_map.removeLayer(this.vectors[index]);
        }

        this.vectors = [];
    }
    catch(err){
        console.log("line layer not found"+ err);
    }


};


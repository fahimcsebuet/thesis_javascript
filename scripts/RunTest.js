

function sampleOutput(){

	result= new Array();
	result[0] = new Array();
	result[1] = new Array();
	result[2] = new Array();

	result[0][0] = "1778185456"
	result[1][result[0][0]] = "90.4179973"
	result[2][result[0][0]] = "23.7105191"

	result[0][1] = "1778185464"
	result[1][result[0][1]] = "90.4197997"
	result[2][result[0][1]] = "23.7063736"

	return result
}



function getResult(s_lat,s_lon,d_lat,d_lon){

	test_type = "basic diksjtra";
	//timer_start=1;   //test started

	result_points = sampleOutput()

	timer_start=0;   //test ended

	return result_points;
}

function createLineString(data){

	 linestring = new Array();
	 var length = data[0].length;
	 for(i=0;i<length;i++)
	 {
	  		linestring[i] = new OpenLayers.Geometry.Point(data[1][data[0][i]],data[2][data[0][i]]);
			
	 }

	 return linestring;
}

var style = {
	strokeColor: '#0000ff',
	strokeOpacity: 0.8,
	strokeWidth: 4
};
function plotOSMLine(OSM_MAP,linestring){

	vector = new OpenLayers.Layer.Vector();
	var featureVector = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString(linestring).transform(
				new OpenLayers.Projection("EPSG:4326"), 
				new OpenLayers.Projection("EPSG:900913")
			),null,style
		);
	
	vector.addFeatures([featureVector]);
	OSM_MAP.addLayers([vector]);

}

function RunTest(){

	result_points = getResult(s_lat,s_lon,d_lat,d_lon);
	console.log(result_points);
	linestring = createLineString(result_points);
	console.log(linestring);

	plotOSMLine(map,linestring);
}

RunTest();
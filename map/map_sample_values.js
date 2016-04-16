
Map.prototype.getSampleDataforLineString = function() {
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
};

Map.prototype.getLatAndLonForCreateData = function() {
	ret = new Array();
	ret[0] = new Array(); // Sample Lat and Lon for source
	ret[1] = new Array(); // Sample Lat and Lon for destination
	// Source Shahjalal International Airport
	ret[0][0] = "23.850468700130858"; // Lat 
	ret[0][1] = "90.4081854500638"; // Lon
	// Destination Kamlapur Railway Station
	ret[1][0] = "23.731170773559835"; // Lat
	ret[1][1] = "90.42526575706768"; // Lon
	
	return ret;
}

Map.prototype.getSampleStyle = function() {
	var style = {
		strokeColor: '#0000ff',
		strokeOpacity: 0.8,
		strokeWidth: 4
	};

	return style
};

Map.prototype.getGreenStyle = function() {
	var style = {
		strokeColor: '#F5162C',
		strokeOpacity: 0.8,
		strokeWidth: 4
	};

	return style
}

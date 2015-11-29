
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

Map.prototype.getSampleStyle = function() {
	var style = {
		strokeColor: '#0000ff',
		strokeOpacity: 0.8,
		strokeWidth: 4
	};

	return style
};

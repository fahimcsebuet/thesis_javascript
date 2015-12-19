
vertex_cover_url = "https://fahimcsebuet.github.io/thesis_javascript/graph/vertex_cover.txt"

function show_vertex_cover(map){

	 $.get(vertex_cover_url, function(data) {
		show_vertex_cover_end(data,map);
    }, 'text');

}

function show_vertex_cover_end(data,map){

	//console.log(data);
	xml = data;
	xmlDoc = $.parseXML(data);
	$xml = $(xmlDoc);
	
	$graph = $xml.find("graph");
	$nodes = $graph.find("item");
	
	$nodes.each(function(){
	
		//console.log(this);
		var lon = $(this).attr("lon");
		var lat = $(this).attr("lat");
		
		map.addMarker(lon,lat);
	
	});
	
	//console.log($nodes);
	
	

}
/**
 * Created by milu on 11/19/15.
 */

 
CircularGraphLoader.prototype = new GraphLoader();
CircularGraphLoader.prototype.constructor = CircularGraphLoader
 
 function CircularGraphLoader(map,callback){
	
	this.map = map;
	this.callback = callback;
 
 }
 
 
 CircularGraphLoader.prototype.loadEdgeWithWeight = function(data){
	
	//console.log(data);
	var graph = this.graph;
	var all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		var nedge = all_edges[p].split(',');
		if(typeof nedge[1] != 'undefined' && this.checkCircularArea(nedge[0]) && this.checkCircularArea(nedge[1])){
			graph.addEdge(nedge[0],nedge[1],nedge[2]);
			graph.addEdge(nedge[1],nedge[0],nedge[2]);
			
			//this.map.addMarker(this.graph.nodes_point[nedge[0]].lon,this.graph.nodes_point[nedge[0]].lat);
			//this.map.addMarker(this.graph.nodes_point[nedge[1]].lon,this.graph.nodes_point[nedge[1]].lat);
            //console.log(nedge[2]);
		}
	}
}

CircularGraphLoader.prototype.checkCircularArea = function(node){
	var map = this.map;
	var midlon = (map.s_lon + map.d_lon)/2;
	var midlat = (map.s_lat + map.d_lat)/2;
	
	var rad = ((map.s_lon-map.d_lon)*(map.s_lon-map.d_lon) + (map.s_lat-map.d_lat)*(map.s_lat-map.d_lat))/2;
	
	var node_lon = this.graph.nodes_point[node].lon;
	var node_lat = this.graph.nodes_point[node].lat;
	
	var dist = (midlon-node_lon)*(midlon-node_lon) + (midlat-node_lat)*(midlat-node_lat);
	
	if(dist > rad + 0.0000001) return false;
	
	return true;
}

 
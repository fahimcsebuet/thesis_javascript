/**
 * Created by milu on 11/19/15.
 */

 
BandGraphLoader.prototype = new GraphLoader();
BandGraphLoader.prototype.constructor = BandGraphLoader
 
 function BandGraphLoader(map,callback){
	
	this.map = map;
	this.callback = callback;
 
 }
 
 
 BandGraphLoader.prototype.loadEdgeWithWeight = function(data){
	
	//console.log(data);
	var graph = this.graph;
	var all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		var nedge = all_edges[p].split(',');
		if(typeof nedge[1] != 'undefined' && this.checkBandrArea(nedge[0]) && this.checkBandrArea(nedge[1])){
			graph.addEdge(nedge[0],nedge[1],nedge[2]);
			graph.addEdge(nedge[1],nedge[0],nedge[2]);
			
			//this.map.addMarker(this.graph.nodes_point[nedge[0]].lon,this.graph.nodes_point[nedge[0]].lat);
			//this.map.addMarker(this.graph.nodes_point[nedge[1]].lon,this.graph.nodes_point[nedge[1]].lat);
            //console.log(nedge[2]);
		}
	}
}

BandGraphLoader.prototype.checkBandrArea = function(node){
	var map = this.map;
	
	var x1 = map.s_lon
	var y1 = map.s_lat
	
	var x2 = map.d_lon
	var y2 = map.d_lat
	
	var a = y1 - y2;
	var b = x2 - x1;
	var c = x1*y2-x2*y1
	
	var x0 = this.graph.nodes_point[node].lon;
	var y0 = this.graph.nodes_point[node].lat;
	
	var lob = Math.abs(a*x0 + b*y0 + c);
	var hor = Math.sqrt(a*a + b*b)
	
	var dist = lob/hor;
	
	if(dist > 0.1) return false;
	
	return this.checkCircularArea(node);
}

BandGraphLoader.prototype.checkCircularArea = function(node){
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

 
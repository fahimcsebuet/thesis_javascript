/**
 * Created by milu on 11/19/15.
 */

 function GraphLoader(map,callback){
	
	this.map = map;
	this.callback = callback;
 
 }
 
GraphLoader.prototype.load = function(){
	
	this.graph = new Graph();
	this.getNodeList();
}

GraphLoader.prototype.getNodeList = function(){
	var that = this;
	 $.get(node_list_url, function(data) {
        that.loadNode(data);
        that.getEdgeList();
    }, 'text');
}

GraphLoader.prototype.loadNode = function(data){
		//console.log(data);
	var map = this.map;
	var graph = this.graph;
	var all_nodes = data.split('\n');
	var source_closest = new ClosestNodeFinder(map.s_lon,map.s_lat);
	var destination_closest = new ClosestNodeFinder(map.d_lon,map.d_lat);
	for(var p = 0; p < all_nodes.length; p++){
		//console.log(all_nodes[p]);
		var node_point = all_nodes[p].split(':');
		var node = node_point[0];
		
		if(typeof node_point[1] != 'undefined'){
			var npoint = node_point[1].split(',');
			
			graph.addNodeLonlat(node,npoint[0],npoint[1]);
			
			//console.log(point[0]);
			source_closest.checkNode(node,npoint[0],npoint[1]);
			destination_closest.checkNode(node,npoint[0],npoint[1]);
		}
	}
	map.source_node = source_closest.closest_node;
	map.destination_node = destination_closest.closest_node;

}
 
GraphLoader.prototype.getEdgeList = function(){
	var that = this;
    $.get(edge_list_dist_url, function(data) {
        //load_edge(data,graph);
        that.loadEdgeWithWeight(data);
        that.callback(that.graph,that.map);
    }, 'text');

}

GraphLoader.prototype.loadEdge = function(data){
	
	//console.log(data);
	var graph = this.graph;
	var all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		var nedge = all_edges[p].split(',');
		if(typeof nedge[1] != 'undefined'){
			graph.addEdge(nedge[0],nedge[1],nedge[2]);
			graph.addEdge(nedge[1],nedge[0],nedge[2]);

            //console.log(nedge[2]);
		}

	}
}

GraphLoader.prototype.loadEdgeWithWeight = function(data){
	
	//console.log(data);
	var graph = this.graph;
	var all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		var nedge = all_edges[p].split(',');
		if(typeof nedge[1] != 'undefined'){
			graph.addEdge(nedge[0],nedge[1],nedge[2]);
			graph.addEdge(nedge[1],nedge[0],nedge[2]);

            //console.log(nedge[2]);
		}
	}
}
 
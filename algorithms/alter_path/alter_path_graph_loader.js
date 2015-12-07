/**
 * Created by milu on 11/19/15.
 */

 
AlterGraphLoader.prototype = new GraphLoader();
AlterGraphLoader.prototype.constructor = AlterGraphLoader
 
 function AlterGraphLoader(map,callback){
	
	this.map = map;
	this.callback = callback;
 
 }
 
 AlterGraphLoader.prototype.loadNode = function(data){
		//console.log(data);
	var map = this.map;
	var graph = this.graph;
	var all_nodes = data.split('\n');
	var source_closest = new ClosestNodeFinder(map.s_lon,map.s_lat);
	var destination_closest = new ClosestNodeFinder(map.d_lon,map.d_lat);
	var alter_closest = new ClosestNodeFinder(map.a_lon,map.a_lat);
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
			alter_closest.checkNode(node,npoint[0],npoint[1]);
		}
	}
	map.source_node = source_closest.closest_node;
	map.destination_node = destination_closest.closest_node;
	map.alter_node = alter_closest.closest_node;

}


 
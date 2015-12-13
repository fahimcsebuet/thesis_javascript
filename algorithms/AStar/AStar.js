/**
 * Created by milu on 11/18/15.
 */

function AStar(map){

	this.map = map;
	algo_status = new AlgoRunningStatus("simple dijkstra");
}

AStar.prototype.run = function(){
	algo_status.set_status_running();
	//global_graph = null;
	if(global_graph){

		this.getClosestSourceDestNode(global_graph,this.map);
		this.end(global_graph,this.map);
		
	}
	else{
		
		//load_graph(this.map,this.end);
		var that = this;
		new GraphLoader(that.map,that.end).load();
	}
}

AStar.prototype.end = function(graph,map){
	//global_graph = graph;
	//console.log(map.source_node + "," + map.destination_node);
	var result_path = graph.getResultDataPathAStar(map.source_node,map.destination_node);
	if(result_path[0].length < 1) 
	{
		console.log("No path found");
		algo_status.set_status_failed("No Path!");
	}
	else{
		console.log("Path found with length = " + result_path[0].length);
		algo_status.set_status_succeeded("Path Found!");
		map.plotResult(result_path,map.getSampleStyle());
	}
	console.log("Simple dijkstra end ....");
	global_graph = graph;
}

AStar.prototype.getClosestSourceDestNode = function(graph,map){

	var source_closest = new ClosestNodeFinder(map.s_lon,map.s_lat);
	var destination_closest = new ClosestNodeFinder(map.d_lon,map.d_lat);
	
	for(var i in graph.nodes_point){
	
		source_closest.checkNode(i,graph.nodes_point[i].lon,graph.nodes_point[i].lat);
		destination_closest.checkNode(i,graph.nodes_point[i].lon,graph.nodes_point[i].lat);
	}
	
	map.source_node = source_closest.closest_node;
	map.destination_node = destination_closest.closest_node;

}
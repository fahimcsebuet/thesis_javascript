/**
 * Created by milu on 11/18/15.
 */


function AlterPath(map){

	this.map = map;
	algo_status = new AlgoRunningStatus("alter path");
}

AlterPath.prototype.run = function(){
	algo_status.set_status_running();
	var that = this;
	new AlterGraphLoader(that.map,that.end).load();	
}


AlterPath.prototype.end = function(graph,map){
	//global_graph = graph;
	console.log(map.source_node + "," + map.destination_node + "," + map.alter_node);
	delete graph.nodes[map.alter_node];
	
	var result_path = graph.getResultDataPath(map.source_node,map.destination_node);
	if(result_path[0].length < 1) 
	{
		console.log("No path found");
		algo_status.set_status_failed("No Path!");
	}
	else{
		console.log("Path found with length = " + result_path[0].length);
		algo_status.set_status_succeeded("Path Found!");
		map.plotResult(result_path,map.getGreenStyle());
	}
	console.log("Alter Path end ....");
	global_graph = graph;
}

/**
 * Created by milu on 11/18/15.
 */
 
algo_status = new AlgoRunningStatus("nn")
 
function simple_dijkstra(map){
	algo_status.set_status_running();
    load_graph(map,simple_dijkstra_end);
}

function simple_dijkstra_end(graph,map){

	result_path = graph.getResultDataPath(map.source_node,map.destination_node);

	if(result_path[0].length < 1) 
	{
		console.log("No path found");
		algo_status.set_status_failed("No Path!");

	}
	else{
		
		console.log("Path found with length = " + result_path[0].length);
		algo_status.set_status_succeeded("Path Found!");

	}
	
	map.plotResult(result_path,map.getSampleStyle());
	console.log("Simple dijkstra end ....");
	
}

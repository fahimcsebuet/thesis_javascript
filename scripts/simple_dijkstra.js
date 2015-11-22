/**
 * Created by milu on 11/18/15.
 */
 
edge_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list.txt';
node_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/node_list.txt';

function simple_dijkstra(map){
	load_graph(edge_list_url,node_list_url,map,simple_dijkstra_end);
}

function simple_dijkstra_end(graph,map){
	map.source_node = "1778185456";
	map.destination_node = "1778185464";
	result_path = graph.getResultDataPath(map.source_node,map.destination_node);
	
	if(result_path[0].length < 1) 
	{
		console.log("No path found");
	}
	else{
		
		console.log("Path found with length = " + result_path[0].length);
		console.log(result_path);
	}
	
	map.plotResult(result_path,map.getSampleStyle());
	console.log("Simple dijkstra end ....");
}

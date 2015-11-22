/**
 * Created by milu on 11/18/15.
 */
 
edge_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list.txt';
node_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/node_list.txt';

function simple_dijkstra(map){
	load_graph(edge_list_url,node_list_url,map,simple_dijkstra_end);
}

function simple_dijkstra_end(graph,map){
	result_path = graph.getResultDataPath(map.source_node,map.destination_node);
	map.plotResult(result_path);
	console.log("Simple dijkstra end ....");
}

/**
 * Created by milu on 11/19/15.
 */

function load_graph(edge_list_url,node_list_url,map,callback){

    graph = new Graph();
    getNodeList(node_list_url,edge_list_url,graph,map,callback);
}

function getNodeList(node_list_url,edge_list_url,graph,map,callback){

    $.get(node_list_url, function(data) {
        load_node(data,graph,map);
        getEdgeList(edge_list_url,graph,map,callback);

    }, 'text');

}

function getEdgeList(edge_list_url,graph,map,callback){

    $.get(edge_list_url, function(data) {
        load_edge(data,graph);
        callback(graph,map);
    }, 'text');

}

function load_node(data,graph,map){
	
	//console.log(data);
	all_nodes = data.split('\n');
	source_closest = new ClosestNodeFinder(map.s_lon,map.s_lat);
	destination_closest = new ClosestNodeFinder(map.d_lon,map.d_lat);
	for(p = 0; p < all_nodes.length; p++){
		//console.log(all_nodes[p]);
		node_point = all_nodes[p].split(':');
		node = node_point[0];
		
		if(typeof node_point[1] != 'undefined'){
			npoint = node_point[1].split(',');
			
			graph.addNodeLonlat(node,npoint[0],npoint[1]);
			
			//console.log(point[0]);
			source_closest.checkNode(node,npoint[0],npoint[1]);
			destination_closest.checkNode(node,npoint[0],npoint[1]);
		}
	}
	
	map.source_node = source_closest.closest_node;
	//console.log(map.source_node);
	map.destination_node = destination_closest.closest_node;
	//console.log(map.destination_node);
}

function load_edge(data,graph){
	//console.log(data);
	all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		nedge = all_edges[p].split(',');
		if(typeof nedge[1] != 'undefined'){
			graph.addEdgeWeightLess(nedge[0],nedge[1]);
			graph.addEdgeWeightLess(nedge[1],nedge[0]);
		}
		
	}
}


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
	for(p = 0; p < all_nodes.length; p++){
		//console.log(all_nodes[p]);
		node_point = all_nodes[p].split(':');
		node = node_point[0];
		
		if(typeof node_point[1] != 'undefined'){
			point = node_point[1].split(',');
			//console.log(node);
			graph.addNodeLonlat(node,point[0],point[1]);
		}
	}
}

function comparePoint(ax,ay,bx,by){
	
}

function load_edge(data,graph){
	//console.log(data);
	all_edges = data.split('\n');
	for(p = 0; p < all_edges.length; p++){
		edge = all_edges[p].split(',');
		if(typeof edge[1] != 'undefined'){
			graph.addEdge(edge[0],edge[1],1);
		}
		
	}
}


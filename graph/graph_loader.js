/**
 * Created by milu on 11/19/15.
 */

node_list = -1;
edge_list = -1;

function load_graph(edge_list_url,node_list_url,callback){

    graph = new Graph();
    getNodeList(node_list_url,edge_list_url,graph,callback);
}

function getNodeList(node_list_url,edge_list_url,graph,callback){

    $.get(node_list_url, function(data) {
        //console.log(data);
        load_node(data,graph);
        getEdgeList(edge_list_url,graph,callback);

    }, 'text');

}

function getEdgeList(edge_list_url,graph,callback){

    $.get(edge_list_url, function(data) {
        //console.log(data);
        load_edge(data,graph);
        callback(graph);
    }, 'text');

}

function load_node(data,graph){


}

function load_edge(data,graph){


}


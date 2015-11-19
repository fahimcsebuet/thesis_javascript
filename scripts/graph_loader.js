/**
 * Created by milu on 11/19/15.
 */

node_list = -1;
edge_list = -1;

function load_graph(edge_list_url,node_list_url){

    graph = 0;


    return graph;
}

function getNodeList(url){

    $.get(url, function(data) {
        console.log(data);

        getEdgeList();

    }, 'text');

}

function load_node(nodes){


}

function getEdgeList(url){

    $.get(url, function(data) {
        console.log(data);

    }, 'text');

}
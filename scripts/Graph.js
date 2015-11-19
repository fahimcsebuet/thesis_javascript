/**
 * Created by milu on 11/19/15.
 */

function Edge(start, end, weight) {

	this.start = start;
	this.end = end;
	this.weight = weight;
}

function Graph(){

    this.nodes = [];

}

Graph.prototype.addEdge = function(start, end, weight){

    if(typeof this.nodes[start] == 'undefined'){
        this.nodes[start] = [];
    }

    edge = new Edge(start, end, weight);
    this.nodes[start].push(edge);
};

Graph.prototype.removeNode = function(index){

    this.nodes.splice(index,1)
};

Graph.prototype.pathsFrom = function(from){

    dist = [];
    dist[from] = 0;
    visited = [];
    previous = [];
    queue = [];

    return [dist,previous]
};

Graph.prototype.pathsTo = function(node_dsts, tonode){
//
        current = tonode;
		path = [];

		if( typeof node_dsts[current] != 'undefined') {
            path.push(tonode);
		}

		while(typeof node_dsts[current] != 'undefined') {
			nextnode = node_dsts[current];
            path.push(nextnode);
			current = nextnode;
		}
		return path.reverse();
};

Graph.prototype.getPath = function(from,to){

    a = this.paths_from(from);
    distances = a[0];
    prev = a[1];
	return this.paths_to(prev,to);
};




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

    Q = new PriorityQueue(compareWeights);
	Q.add([dist[from], from]);

    while(Q.size() > 0) {

            a = Q.remove();
            distance = a[0];
            u = a[1];


            if (typeof visited[u] != 'undefined') {
                continue;
            }
            visited[u] = True;

            if (typeof visited[u] == 'undefined') {
                console.log("WARNING: 'u' is not found in the node list\n");
            }

            for(k=0;nodes[u].lenght;k++)
            {
                edge = nodes[u][k];
                alt = dist[u] + edge.weight;
                end = edge.end;
                if (typeof dist[end] == 'undefined' || alt < dist[end]) {
                    previous[end] = u;
                    dist[end] = alt;
                    Q.add([dist[end], end]);
                }
            }
    }


	nodes = this.nodes;
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

function compareWeights(a, b) {
	return a.data[0] - b.data[0];
}





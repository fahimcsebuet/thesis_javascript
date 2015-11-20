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

    nodes = this.nodes;

    while(Q.getSize() > 0) {

            //console.log("size = "+Q.getSize());

            node_data = Q.remove();
            distance = node_data[0];
            u = node_data[1];

            //console.log(node_data);

            if (typeof visited[u] != 'undefined') {
                continue;
            }
            visited[u] = true;

            //console.log("visited-"+ u + "=" +visited[u]);

            if (typeof nodes[u] == 'undefined') {
                console.log("WARNING: 'u' is not found in the node list\n");
                 continue;
            }

            var k;
            //console.log("node length = "+ nodes[u].length);

            for(k=0; k < nodes[u].length; k++)
            {
                edge = nodes[u][k];
                //console.log("edge="+edge);

                alt = dist[u] + edge.weight;
                end = edge.end;
                if (typeof dist[end] == 'undefined' || alt < dist[end]) {
                    previous[end] = u;
                    dist[end] = alt;
                    Q.add([dist[end], end]);
                }
            }
    }

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

    pathfrom = this.pathsFrom(from);
    //console.log(pathfrom[0]);
    //console.log(pathfrom[1]);

    distances = pathfrom[0];
    prev = pathfrom[1];
	return this.pathsTo(prev,to);
};

function compareWeights(a, b) {
	return a.data[0] - b.data[0];
}





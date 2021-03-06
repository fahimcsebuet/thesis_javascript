/**
 * Created by milu on 11/19/15.
 */

function Edge(start, end, weight) {

	this.start = start;
	this.end = end;
	this.weight = weight;
}

function Point(lon,lat){

    this.lon = lon;
    this.lat = lat;

}

function Graph(){

    this.nodes = [];
    this.nodes_point = [];

}

Graph.prototype.addNodePoint = function(node,point){

    this.nodes_point[node] = point
};

Graph.prototype.addNodeLonlat = function(node,lon,lat){
	
	point = new Point(lon,lat);
    this.addNodePoint(node,point);
};

Graph.prototype.addEdge = function(start, end, weight){

    if(typeof this.nodes[start] == 'undefined'){
        this.nodes[start] = [];
    }

    edge = new Edge(start, end, weight);
    this.nodes[start].push(edge);
};

Graph.prototype.addEdgeWeightLess = function(start, end){

    weight = this.getWeight(start, end);
    this.addEdge(start, end, weight);
};

Graph.prototype.getWeight = function(start,end){

        slon = this.nodes_point[start].lon;
		slat = this.nodes_point[start].lat;
		
		dlon = this.nodes_point[end].lon;
		dlat = this.nodes_point[end].lat;
		
		weight = (slon-dlon)*(slon-dlon) + (slat-dlat)*(slat-dlat);
		//console.log(weight);
		return weight;
		
		
		
		
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
                //console.log("WARNING: 'u' is not found in the node list\n");
                 continue;
            }

            var k;
            //console.log("node length = "+ nodes[u].length);

            for(k=0; k < nodes[u].length; k++)
            {
                edge = nodes[u][k];
                //console.log("edge="+edge);

                alt = Big(dist[u]).plus(edge.weight).toString();
                end = edge.end;
                if (typeof dist[end] == 'undefined' || alt < dist[end]) {
                    previous[end] = u;
                    dist[end] = alt;
                    Q.add([dist[end], end]);
                }
            }
    }
	this.visited = visited;
    return [dist,previous]
};

Graph.prototype.pathsFromAStar = function(from,to){

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
                //console.log("WARNING: 'u' is not found in the node list\n");
                 continue;
            }

            var k;
            //console.log("node length = "+ nodes[u].length);

            for(k=0; k < nodes[u].length; k++)
            {
                edge = nodes[u][k];
                //console.log("edge="+edge);
				
				alt_big = Big(dist[u]).plus(edge.weight);
                alt = alt_big.toString();
                end = edge.end;
                if (typeof dist[end] == 'undefined' || alt < dist[end]) {
                    previous[end] = u;
                    dist[end] = alt;
					
					f_hu = alt_big.plus(Math.sqrt(this.getWeight(end,to)));
                    
					Q.add([f_hu, end]);
					
                }
            }
			
			if(u==to) {
						console.log("terminated...");
						break;
			}
    }
	
	this.visited = visited;

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

Graph.prototype.getPathAStar = function(from,to){

    pathfrom = this.pathsFromAStar(from,to);
    //console.log(pathfrom[0]);
    //console.log(pathfrom[1]);

    distances = pathfrom[0];
    prev = pathfrom[1];
	return this.pathsTo(prev,to);
};

Graph.prototype.getResultDataPath = function(from,to){

    rpath = this.getPath(from,to);

    var k;
    rdata = [];
    rdata[0] = [];
    rdata[1] = [];
    rdata[2] = [];
    for(k=0;k<rpath.length;k++){

        rdata[0][k] = rpath[k];
        rdata[1][rdata[0][k]] = this.nodes_point[rdata[0][k]].lon;
        rdata[2][rdata[0][k]] = this.nodes_point[rdata[0][k]].lat;

    }

    return rdata;
};

Graph.prototype.getResultDataPathAStar = function(from,to){

    rpath = this.getPathAStar(from,to);

    var k;
    rdata = [];
    rdata[0] = [];
    rdata[1] = [];
    rdata[2] = [];
    for(k=0;k<rpath.length;k++){

        rdata[0][k] = rpath[k];
        rdata[1][rdata[0][k]] = this.nodes_point[rdata[0][k]].lon;
        rdata[2][rdata[0][k]] = this.nodes_point[rdata[0][k]].lat;

    }

    return rdata;
};

Graph.prototype.showVisitedNode =function(map){
	
	for(var a_node in this.visited){
		
		//console.log(a_node);
		map.addMarker(this.nodes_point[a_node].lon,this.nodes_point[a_node].lat);
	
	}
	

}


function compareWeights(a, b) {
	//return Big(a.data[0]).minus(b.data[0]).toString();
	return a.data[0] - b.data[0];
}





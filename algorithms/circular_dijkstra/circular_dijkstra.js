/**
 * Created by milu on 11/18/15.
 */

CircularDijkstra.prototype = new SimpleDijkstra();
CircularDijkstra.prototype.constructor = CircularDijkstra
 
 
function CircularDijkstra(map){

	this.map = map;
	algo_status = new AlgoRunningStatus("circular dijkstra");
}

CircularDijkstra.prototype.run = function(){
	algo_status.set_status_running();
	global_graph = null;
	if(global_graph){

		this.getClosestSourceDestNode(global_graph,this.map);
		this.end(global_graph,this.map);
		
	}
	else{
		
		//load_graph(this.map,this.end);
		var that = this;
		new CircularGraphLoader(that.map,that.end).load();
	}
}

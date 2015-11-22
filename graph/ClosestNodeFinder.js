

function ClosestNodeFinder(lon,lat) {
	
	this.lon = lon;
	this.lat = lat;
	
	this.closest_node = -1;
	this.closest_dist = '100000';
	
	//console.log(this.lon);
}

ClosestNodeFinder.prototype.checkNode = function(node_id,lon,lat){
    dist = this.getDist(lon,lat);
	//console.log(lon);
	if( dist < this.closest_dist){
		
		this.closest_node = node_id;
		this.closest_dist = dist
	}
};

ClosestNodeFinder.prototype.getDist = function(lon,lat){
	
        slon = this.lon;
		slat = this.lat;
		
		dlon = lon;
		dlat = lat;
		
		//console.log(slon);
		//console.log(dlon);
		
		return (slon-dlon)*(slon-dlon) + (slat-dlat)*(slat-dlat);
};
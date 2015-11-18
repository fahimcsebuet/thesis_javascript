
Map.prototype.setClickEvents = function() {
	
		map = this.osm_map;
		markers = this.markers;
		Map_obj = this


		OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
	    defaultHandlerOptions: {
	        'single': true,
	        'double': false,
	        'pixelTolerance': 0,
	        'stopSingle': false,
	        'stopDouble': false
	    },

	    initialize: function(options) {
	        this.handlerOptions = OpenLayers.Util.extend(
	            {}, this.defaultHandlerOptions
	        );
	        OpenLayers.Control.prototype.initialize.apply(
	            this, arguments
	        ); 
	        this.handler = new OpenLayers.Handler.Click(
	            this, {
	                'click': this.trigger
	            }, this.handlerOptions
	        );
	    }, 

	    trigger: function(e) {
	        lonlat = map.getLonLatFromPixel(e.xy);
			lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
		
	        if(Map_obj.select_source==1)
				{
					Map_obj.s_lat = lonlat.lat;
					Map_obj.s_lon = lonlat.lon;
					
				 var ourpoint1 = new OpenLayers.LonLat(Map_obj.s_lon,Map_obj.s_lat)
	             ourpoint1.transform(new OpenLayers.Projection("EPSG:4326" ), map.getProjectionObject());
				 
				 markers.addMarker(new OpenLayers.Marker(ourpoint1));
				 
				 Map_obj.select_dest=1;
				 Map_obj.select_source=0;
				 
				 console.log("You have clicked near s (" + Map_obj.s_lat + " N, " + Map_obj.s_lon + " E)");
					
			}
			
			else if(Map_obj.select_dest==1)
			{
					Map_obj.d_lat = lonlat.lat;
					Map_obj.d_lon = lonlat.lon;
					
				var ourpoint2 = new OpenLayers.LonLat(Map_obj.d_lon,Map_obj.d_lat)
	             ourpoint2.transform(new OpenLayers.Projection("EPSG:4326" ), map.getProjectionObject());
				 
				 markers.addMarker(new OpenLayers.Marker(ourpoint2));
				 
				 console.log("You have clicked near d (" + Map_obj.d_lat + " N, " + Map_obj.d_lon+ " E)");

				 Map_obj.select_dest = 0;
			}
			else
			{
				Map_obj.select_dest=0;
				Map_obj.select_source=1;

				markers.clearMarkers();
			
			
			}
	    }

	});

	var click = new OpenLayers.Control.Click();
	map.addControl(click);
	click.activate();
};
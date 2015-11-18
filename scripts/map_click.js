
Map.prototype.setClickEvents = function() {
	
		that = this;
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
	        lonlat = that.osm_map.getLonLatFromPixel(e.xy);
			lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
		
	        if(that.select_source==1)
				{
					that.s_lat = lonlat.lat;
					that.s_lon = lonlat.lon;
					
				 var ourpoint1 = new OpenLayers.LonLat(that.s_lon,that.s_lat);
	             ourpoint1.transform(new OpenLayers.Projection("EPSG:4326" ), that.osm_map.getProjectionObject());
				 
				 that.markers.addMarker(new OpenLayers.Marker(ourpoint1));
				 
				 that.select_dest=1;
				 that.select_source=0;
				 
				 console.log("You have clicked near s (" + that.s_lat + " N, " + that.s_lon + " E)");
					
			}
			
			else if(that.select_dest==1)
			{
					that.d_lat = lonlat.lat;
					that.d_lon = lonlat.lon;
					
				var ourpoint2 = new OpenLayers.LonLat(that.d_lon,that.d_lat);
	             ourpoint2.transform(new OpenLayers.Projection("EPSG:4326" ), that.osm_map.getProjectionObject());
				 
				 that.markers.addMarker(new OpenLayers.Marker(ourpoint2));
				 
				 console.log("You have clicked near d (" + that.d_lat + " N, " + that.d_lon+ " E)");

				 that.select_dest = 0;
			}
			else
			{
				that.select_dest=0;
				that.select_source=1;

				that.markers.clearMarkers();
			
			
			}
	    }

	});

	var click = new OpenLayers.Control.Click();
	that.osm_map.addControl(click);
	click.activate();
};
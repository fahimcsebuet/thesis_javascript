
var select_source=1;
var select_dest=0;
var s_lat;
var s_lon;
var d_lat;
var d_lon;

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
	
        if(select_source==1)
			{
				s_lat = lonlat.lat;
				s_lon = lonlat.lon;
				
			 var ourpoint1 = new OpenLayers.LonLat(s_lon,s_lat)
             ourpoint1.transform(new OpenLayers.Projection("EPSG:4326" ), map.getProjectionObject());
			 
			 markers.addMarker(new OpenLayers.Marker(ourpoint1));
			 
			 select_dest=1;
			 select_source=0;
			 
			 console.log("You have clicked near (" + s_lat + " N, " + s_lon + " E)");
				
		}
		
		else if(select_dest==1)
		{
				d_lat = lonlat.lat;
				d_lon = lonlat.lon;
				
			var ourpoint2 = new OpenLayers.LonLat(d_lon,d_lat)
             ourpoint2.transform(new OpenLayers.Projection("EPSG:4326" ), map.getProjectionObject());
			 
			 markers.addMarker(new OpenLayers.Marker(ourpoint2));
			 
			 console.log("You have clicked near (" + d_lat + " N, " + d_lon+ " E)");
			 
			 select_dest=0;
		}
		else
		{
		    select_dest=0;
			select_source=1;
			markers.clearMarkers();
		
		
		}
    }

});

var click = new OpenLayers.Control.Click();
map.addControl(click);
click.activate();
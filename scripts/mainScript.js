/**
 * Created by milu on 11/18/15.
 */



$( document ).ready(function() {
        console.log( "ready!" );
        $('.selectpicker').selectpicker();

        var map = initMap();

        $('#run_button').click(function(){
                console.log("Run Pressed");
                var algorithm = $('#algo_selector').val();
                runAlgorithm(map,algorithm);
        });

        $('#clear_button').click(function(){

                map.clearMap();

        });

        console.log( "End!" );
});

function initMap(){

       var  map = new Map("OSM_Map");
        map.initOSM();
        map.setMidPoint(90.3989,23.7937,12);
        map.setClickEvents();
        return map;
}

function runAlgorithm(map,algorithm){

        var style = map.getSampleStyle();

        if(algorithm  == "0"){

                console.log("Select an algo..");
        }
        else if(algorithm == "1"){

                console.log("Running Sample ....");
                var sdata = map.getSampleDataforLineString();
                GraphTest();
				
				load_graph(map,after);
				
				map.plotResult(sdata,style);

        }
        else if(algorithm == "2"){
				
				if(map.s_lon == -1 || map.s_lat == -1 || map.d_lon == -1 || map.d_lat == -1){
					
					alert("Select Source and Destination point!");
				}
				else{
					  console.log("Running Sample Dijkstra ....");
					  //simple_dijkstra(map);
					  var alg = new SimpleDijkstra(map);
					  alg.run();
				}
        }
		else if(algorithm == "3"){
				
				if(map.s_lon == -1 || map.s_lat == -1 || map.d_lon == -1 || map.d_lat == -1){
					
					alert("Select Source and Destination point!");
				}
				else{
					  console.log("Running Sample Dijkstra ....");
					  //simple_dijkstra(map);
					  var alg = new CircularDijkstra(map);
					  alg.run();
				}
        }
        else{
                console.log("Unimplemented algo ....");
        }
}

function after(graph){
	console.log('callback....');
}




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
		
		$('#algo_selector').change(function(){
			//console.log("ddd>>>");
			if($(this).val()=="6"){
				//console.log(">>>");
				map.alter_path_select = true;
			}
			else{
				map.alter_path_select = false;
			}
		
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
		else if(algorithm == "4"){
				
				if(map.s_lon == -1 || map.s_lat == -1 || map.d_lon == -1 || map.d_lat == -1){
					
					alert("Select Source and Destination point!");
				}
				else{
					  console.log("Running Sample Dijkstra ....");
					  //simple_dijkstra(map);
					  var alg = new BandDijkstra(map);
					  alg.run();
				}
        }
		else if(algorithm == "5"){
				
				if(map.s_lon == -1 || map.s_lat == -1 || map.d_lon == -1 || map.d_lat == -1){
					
					alert("Select Source and Destination point!");
				}
				else{
					  console.log("Running AStar Search ....");
					  //simple_dijkstra(map);
					  var alg = new AStar(map);
					  alg.run();
				}
				
        }
		else if(algorithm == "6"){
				
				if(map.s_lon == -1 || map.s_lat == -1 || map.d_lon == -1 || map.d_lat == -1){
					
					alert("Run dijkstra first!");
				}
				else{
					  console.log("Running Alter Path ....");
					  //simple_dijkstra(map);
					  var alg = new AlterPath(map);
					  alg.run();
				}
				
        }
		else if(algorithm == "7"){
				console.log("Showing Vertex Cover ....");
				show_vertex_cover(map);		

				console.log("Showing Vertex Cover Ended ....");				
        }
        else{
                console.log("Unimplemented algo ....");
        }
}

function after(graph){
	console.log('callback....');
}




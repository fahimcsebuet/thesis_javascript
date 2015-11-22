/**
 * Created by milu on 11/18/15.
 */

edge_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list.txt';
node_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/node_list.txt';

$( document ).ready(function() {
        console.log( "ready!" );
        $('.selectpicker').selectpicker();

        map = initMap();

        $('#run_button').click(function(){
                console.log("Run Pressed");
                algorithm = $('#algo_selector').val();
                runAlgorithm(map,algorithm);
        });

        $('#clear_button').click(function(){

                map.clearMap();

        });

        console.log( "End!" );
});

function initMap(){

        map = new Map("OSM_Map");
        map.initOSM();
        map.setMidPoint(90.3989,23.7937,12);
        map.setClickEvents();
        return map;
}

function runAlgorithm(map,algorithm){

        style = map.getSampleStyle();

        if(algorithm  == "0"){

                console.log("Select an algo..");
        }
        else if(algorithm == "1"){

                console.log("Running Sample ....");
                sdata = map.getSampleDataforLineString();
                GraphTest();
				
				load_graph(edge_list_url,node_list_url,map,after);
				
				map.plotResult(sdata,style);

        }
        else if(algorithm == "2"){

                console.log("Running Sample Dijkstra ....");
                simple_dijkstra(map);
        }
        else{
                console.log("Unimplemented algo ....");

        }

}

function after(graph){
	console.log('callback....');
}




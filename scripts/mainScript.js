/**
 * Created by milu on 11/18/15.
 */

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
        data = map.getSampleDataforLineString();
    }
    else{
        console.log("Unimplemented algo ....");

    }

    if(typeof data != 'undefined'){
        map.plotResult(data,style);
    }

}


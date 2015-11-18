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

        if(algorithm == "1"){
            console.log("Running Sample ....");
            map.runSample();
        }
}


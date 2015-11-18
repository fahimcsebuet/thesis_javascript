/**
 * Created by milu on 11/18/15.
 */



$( document ).ready(function() {
        console.log( "ready!" );
        $('.selectpicker').selectpicker();

        map = initMap();

        console.log( "End!" );
});

function runAlgorithm(map){
;


}

function initMap(){

    map = new Map("OSM_Map");
    map.initOSM();
    map.setMidPoint(90.3989,23.7937,12);
    map.setClickEvents();
    runSample(map);
    return map;
}

function runSample(map){
        sampledata = map.getSampleDataforLineString();
        samplelinestring = map.createLineString(sampledata);
        samplestyle = map.getSampleStyle();
        map.plotOSMLine(samplelinestring,samplestyle);

 }


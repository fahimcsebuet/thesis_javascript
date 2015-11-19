/**
 * Created by milu on 11/18/15.
 */

function simple_dijkstra(map){

    data1 = 0;

    uurl = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list.txt';
    $.get(uurl, function(data) {
            //do_something_with(data)
        console.log(data);
    }, 'text');

    return data1;
}


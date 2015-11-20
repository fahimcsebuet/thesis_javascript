/**
 * Created by milu on 11/20/15.
 */

function GraphTest(){

    console.log("Testing Graph ....");

    g = new Graph();

    g.addEdge(1,2,10);
    g.addEdge(1,3,2);
    g.addEdge(3,2,1);
    g.addEdge(3,4,7);
    g.addEdge(2,4,2);
    g.addEdge(2,5,20);
    g.addEdge(4,5,10);

    path = g.getPath(1,5);

    console.log(path);

    console.log("Testing Graph End ....");
}

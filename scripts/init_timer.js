var timer_start = 0;
count = 0;

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
function timer()
{
	if(timer_start==1)
	{
	    count++;

		  //Do code for showing the number of seconds here
		//document.getElementById("timer").innerHTML= "Dijkstra running " + count + " secs";
		console.log("Dijkstra running " + count + " secs");
	}
}
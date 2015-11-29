
function AlgoRunningStatus(name){

	this.name = name;
}

AlgoRunningStatus.prototype.set_status_running = function(){

	$(".loader").show();
	$("#loading").show();
	$("#fail").hide();
	$("#success").hide();
	$("#info").html("Running...");
	this.started_time = new Date().getTime();

}

AlgoRunningStatus.prototype.set_status_failed = function(msg){
	
	this.ended_time = new Date().getTime();	
	$("#loading").hide();
	$("#fail").show();
	
	this.set_info_screen(msg);

}

AlgoRunningStatus.prototype.set_status_succeeded = function(msg){
	
	this.ended_time = new Date().getTime();
	$("#loading").hide();
	$("#success").show();
	
	this.set_info_screen(msg);
}

AlgoRunningStatus.prototype.get_running_time = function(){

	return this.ended_time - this.started_time;

}

AlgoRunningStatus.prototype.set_info_screen = function(msg){
	
	var info_message = "Time: "+this.get_running_time()+"ms"
	$("#info").html(info_message);

}
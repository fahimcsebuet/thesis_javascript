
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
	console.log("start time: " + this.started_time);
}

AlgoRunningStatus.prototype.set_status_failed = function(msg){
	
	this.ended_time = new Date().getTime();	
	$("#loading").hide();
	$("#fail").show();
	
	this.set_info_screen(msg);
	this.set_hidden_data();
	this.make_text_file();
	// Hack for creating data in a loop
	this.started_time = this.ended_time;
}

AlgoRunningStatus.prototype.set_status_succeeded = function(msg){
	
	this.ended_time = new Date().getTime();
	$("#loading").hide();
	$("#success").show();
	
	this.set_info_screen(msg);
	this.set_hidden_data();
	this.make_text_file();
	// Hack for creating data in a loop
	this.started_time = this.ended_time;	
	$("#visited_button").removeAttr("disabled");
}

AlgoRunningStatus.prototype.get_running_time = function(){

	return this.ended_time - this.started_time;

}

AlgoRunningStatus.prototype.set_info_screen = function(msg){
	var info_message = "Time: "+this.get_running_time()+"ms";
	$("#info").html(info_message);
}

AlgoRunningStatus.prototype.set_hidden_data = function(){
	var hidden_data_value = $("#hidden_data").val();
	hidden_data_value = hidden_data_value + this.get_running_time() + ",";
	console.log("start time: " + this.started_time);
	console.log("ended time: " + this.ended_time);
	console.log(this.get_running_time());
	console.log("running time : " + hidden_data_value);
	$("#hidden_data").val(hidden_data_value);
	console.log($("#hidden_data").val());
}

AlgoRunningStatus.prototype.make_text_file = function() {
	console.log("Creating data...");
	var hidden_data_value = $("#hidden_data").val();
	var data = new Blob([hidden_data_value], {type: 'text/csv'});
	var textFile = null;
	textFile = window.URL.createObjectURL(data);
	var link = document.getElementById('downloadlink');
	link.href = textFile;
	link.style.display = 'block';
};

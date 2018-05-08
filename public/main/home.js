var htmlMaker = function(jData) {
	var retStr='';
	for (var i=0;i<jData.servers.services.length;i++)
	{
		retStr = retStr+'<div>';
		retStr = retStr+'<h2>'+'ServiceName: '+jData.servers.services[i].serviceName+'</h2>';
		retStr = retStr+'<span>'+'Link: </span>'+'<a href='+jData.servers.services[i].protocol+'://'+jData.servers.services[i].ip+':'+jData.servers.services[i].port+'>'+jData.servers.services[i].ip+'</a>';
		retStr = retStr+'</div>';
	}

	return retStr;
}

$(document).ready(function(){
	$.get("/api/servers", function(data,status){
		$("#myDiv").html(htmlMaker(data));
	});

	$("#b01").click(function(){
		$.get("/api/servers", function(data,status){
			$("#myDiv").html(htmlMaker(data));
		});
	});
});

var htmlMaker = function(jData) {
	var retStr='';
	for (var i=0;i<jData.servers.services.length;i++)
	{
		retStr = retStr+'<div class="col-md-6">';
		retStr = retStr+'<div class="portlet light bordered">';
		retStr = retStr+'<div class="portlet-title">';
		retStr = retStr+'<div class="caption"> <i class="icon-share font-dark"></i> <span class="caption-subject font-dark bold uppercase">';
		retStr = retStr+jData.servers.services[i].serviceName;
		retStr = retStr+'</span> </div> <div class="actions"> <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;"> <i class="icon-cloud-upload"></i> <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;"> <i class="icon-wrench"></i> </a> <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;"> <i class="icon-trash"></i> </a> </div> </div> <div class="portlet-body"> <div class="margin-top-10 margin-bottom-10 clearfix"> <table class="table table-bordered table-striped"> ';
		retStr = retStr+'<tr> <td>'+'Address'+'</td>'+'<td>'+jData.servers.services[i].ip+'</td>'+'</tr>';
		retStr = retStr+'<tr> <td>'+'protocol'+'</td>'+'<td>'+jData.servers.services[i].protocol+'</td>'+'</tr>';
		retStr = retStr+'<tr> <td>'+'Port'+'</td>'+'<td>'+jData.servers.services[i].port+'</td>'+'</tr>'+'</table> </div>';
		retStr = retStr+'<a class="btn green" href='+jData.servers.services[i].protocol+'://'+jData.servers.services[i].ip+':'+jData.servers.services[i].port+'>'+'Access or Get help...'+'</a>';
		retStr = retStr+'</div> </div> </div>';

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

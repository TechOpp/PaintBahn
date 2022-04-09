"use strict";

var sess;
var wsuri;
var Connection;

if (document.location.origin == "file://") {
		wsuri = "ws://127.0.0.1:9090/ws";
	} else {
		wsuri = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" +
				document.location.host + ":9090/ws";
	}
	
var script = {};
script.fn = {};	
script.fn.connect = function(){
	Connection = new autobahn.Connection(
		{
			url: wsuri, 										
			realm: 'realm1',
			on_user_error: function (error, customErrorMessage) {
				console.log("error on 1");
			},
			on_internal_error: function (error, customErrorMessage) {
				console.log("error on 2");
			}
		}
	);
	Connection.onopen = function(session , details) {
							log("New session started");
							sess = session;
							sess.log();
							
						};						
	Connection.onclose = function(reason ,  details) { 
							sess = null;
							log(wsuri+" : connection close Reason: " +reason+ "; lost message: " +details.message+ "; Retry count: " +details.retry_count+ "; Next retry: " +details.will_retry);
							
						};
	Connection.open();

}
//=============================================================================================================================

function publishOnRemote(touch,eventType){
	
	var data = {"identifier":touch.identifier,
				"shape":touch.shape,
				"pageX":touch.pageX, 
				"pageY":touch.pageY,
				"action":touch.action,
				"tools":touch.tools, 
				"eventType":eventType,
				"remoteID":sess.id
				};
				
	sess.publish('com.myapp.paint', ['Hello, world!','Welcome Sunny'], data, {acknowledge: true, exclude_me: true}).then(
         function(publication) {
		 //  log("Touch Start Published");
         },
         function(error) {
            console.log("publication error", error);
         }
     );
}



$("#subButton").click(function() { 
	sess.subscribe('com.myapp.paint', onRemoteTouchEvent).then(
		function (subscription) {
			log("subscription OK");
		},
		function (error) {
			console.dir(error);
		}
	);
	
});























// Solve the problem of calling a function before loading library the function depends on 
var syncer = syncer || [];
script.fn.listenWAMP = function(){
	//alert("A new way of function calling asynchronously");
}
var syncer = syncer || []; 

while(syncer.length) { 
    var obj = syncer.shift();
    if (script.fn[obj[0]]) { 
        script.fn[obj[0]].apply(script.fn, obj[1]);// call the script function with it's additional parameters;
    }else {
        throw new Error("Function '"+obj[0]+"' does not exist.'");
    }
}
syncer = {
    push: function(param){
        if (script.fn[param[0]]) {
            script.fn[param[0]].apply(script.fn, param[1]);// call the script function with it's additional parameters;
        }else {
            throw new Error("Function '"+obj[0]+"; does not exist.'");
        }
    }
};



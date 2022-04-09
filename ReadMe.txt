https://wamp-proto.org/implementations.html		// supported by all languages

Run WAMP server Thruway as:  		php vendor/voryx/thruway/Examples/SimpleWsRouter.php	 From root dir

Run WAMP client Autobahn in php as: 		php client\Client.php 				 From root dir
AutobahnJS is JS client run in browser, run it on web server
Now both client are ready to communicate with each others.
like run this line in script shell

connection.session.call('com.myapp.add2', [45,42]).then(function(su){console.log('result:',su)},function(er){console.log("Error ocaures",er)});


https://github.com/crossbario/autobahn-js/blob/master/doc/reference.md

Use wampc node global package to test WAMP Router as :  
$ wampc ws://localhost:9090/ws realm1		// This will first create a connection variable and by that connection establish a session
=>Pub/Sub
Now subscribe one or more client as
$ session.subscribe('test',function(e){console.log("hello",e)});
Now publis a message on a chennal as
$ session.publish('test',["Hello to all"]);

=>Callee/Caller
First Register a callee to Deilar as

    function utcnow() {
        console.log("Someone is calling com.myapp.date");
        now = new Date();
        return now.toISOString();
    }

    session.register('com.myapp.date', utcnow).then(
        function (registration) {
            console.log("Procedure registered:", registration.id);
        },
        function (error) {
            console.log("Registration failed:", error);
        }
    );

Now Call to Callee as
session.call('com.myapp.date');
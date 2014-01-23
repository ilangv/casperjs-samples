		var casper = require("casper").create({
			viewportSize : {width: 1280, height: 720},
			waitTimeout : 10000
		});
		var logMsg = [];

		casper.on('remote.message' , function(msg) {
			//Push all logs to an array so it can be printed together 
			logMsg.push(msg);
		});

		casper.start('http://autos.yahoo.com/', function() {

		     // Choose a make name in dropdown
		    this.fill('form[action="/car-research"]',
		    {
		    	makeId: 'acura'
		    }, false);

		});

		casper.waitForResource(function testResource(resource) {
		//We look for the right XHR call to be fired
			if(resource.url.indexOf("acura") > 0) {
				console.log("XHR call fired for URL " + resource.url);
				console.log("Returned status code " + resource.status);
			    return true;
			}
			return false;
		}, function onReceived() {
		    this.echo('Response received');
		});

		//Capture screenshot of the module alone
		casper.then(function() {

		    this.captureSelector('autos.png', '.gs-findcar-app');

		});

		casper.run(function() {
			this.echo("****** Browser Logs **********");
			this.echo(logMsg);
			this.exit();
		});
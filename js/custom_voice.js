function talk(message, secondMessage = '')
{
	if (!State.BotActive) return;

	$("section > div > span > h1").text('');
	$("section > div > span > h3").text('');

	if (message.constructor === Array) 
		message = message[Math.floor(Math.random() * message.length)];
	
	if (State.SpeakingAllowed) 
	{
		msg.text = message;
		window.speechSynthesis.speak(msg);
	}

	var lenOut = (message.length > 19) ? 500 : 200;
	var lenIn = (message.length > 19) ? 1000 : 600;

	if (!($("section").is(":visible"))) $("section").fadeIn(100);

	$("section > div > span > h1").fadeOut(lenOut, function() { 
		$("section > div > span > h1").text(message); 
		$("section > div > span > h3").text(secondMessage); 
	}).fadeIn(lenIn);
}

function greet(time, mode)
{
	var hour = time.getHours();
	if (ApexSettings.Speaking.Message.Opening.Morning.length < 1 || 
		ApexSettings.Speaking.Message.Opening.Afternoon.length < 1 || 
		ApexSettings.Speaking.Message.Opening.Evening.length < 1) return;

	//Welcome back between 30 and 300 seconds (5 minutes)
	if (!(State.Face.Timer >= ApexSettings.Speaking.Timer.Interim_threshold.Min && State.Face.Timer <= ApexSettings.Speaking.Timer.Interim_threshold.Max)) 
	{
		if (hour > 4 && hour < 12)
		{
			if (mode)
				talk(ApexSettings.Speaking.Message.Opening.Morning[Math.floor(Math.random() * ApexSettings.Speaking.Message.Opening.Morning.length)]);
			else
				talk(ApexSettings.Speaking.Message.Closing.Morning[Math.floor(Math.random() * ApexSettings.Speaking.Message.Closing.Morning.length)]);
		} 
		else if(hour > 11 && hour < 19) {
			if (mode)
				talk(ApexSettings.Speaking.Message.Opening.Afternoon[Math.floor(Math.random() * ApexSettings.Speaking.Message.Opening.Afternoon.length)]);
			else
				talk(ApexSettings.Speaking.Message.Closing.Afternoon[Math.floor(Math.random() * ApexSettings.Speaking.Message.Closing.Afternoon.length)]);
		}
		else {
			if (mode)
				talk(ApexSettings.Speaking.Message.Opening.Evening[Math.floor(Math.random() * ApexSettings.Speaking.Message.Opening.Evening.length)]);
			else
				talk(ApexSettings.Speaking.Message.Closing.Evening[Math.floor(Math.random() * ApexSettings.Speaking.Message.Closing.Evening.length)]);
		}
	}
	else {
		talk(ApexSettings.Speaking.Message.Interim);
	}
	
	if (mode) {
		if (ApexSettings.Speaking.Message.Startup.length == 2)
			talk(ApexSettings.Speaking.Message.Startup[0], ApexSettings.Speaking.Message.Startup[1]);
		else if (ApexSettings.Speaking.Message.Startup.length == 1)
			talk(ApexSettings.Speaking.Message.Startup[0]);
	}
}

setInterval(function()
{ 
	if (State.BotActive) return;

	$("#time").fadeOut(1000);
	$("#status").fadeOut(1000);
	$("section").fadeOut(1000);
	
}, 4000);


function getCurrentTime() 
{
	var date = new Date();
	return curTime = date.getHours().toString() + ":" + (date.getMinutes().toString().length == 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString());
}

setInterval(function() { 

	if (!State.BotActive) return;

	$("#time").text(getCurrentTime());

	if (State.Home) {
		$("section").fadeOut(1000);
		State.Home = false;
	}

}, 1000);
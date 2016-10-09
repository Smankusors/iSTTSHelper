var loggedOn, userID, pass;
chrome.storage.local.get('loggedOn', function(data) {
	loggedOn = data.loggedOn;
	if (loggedOn == true){
		window.location.replace('main.html');
	} else {
		window.location.replace('login.html');
	}
});


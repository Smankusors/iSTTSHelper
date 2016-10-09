var userID;
chrome.storage.local.get('loggedOn', function(data) {
	loggedOn = data.loggedOn;
	console.log("loggedOn", loggedOn);
	var flag = document.documentElement.innerHTML.includes("Selamat Datang,");
	console.log("webLoggedOn", flag);
	if ((loggedOn == true) && (!flag)) {
		chrome.storage.local.get('user', function(data2) { userID = data2.user; });
		chrome.storage.local.get('pass', function(data2) {
			$.post( "http://sim.stts.edu/cek_login.php", {user: userID, pass: data2.pass}, function(result){
				if (result == "<script>window.location='index.php'</script>") window.location.replace("index.php");
			});
		});
	}
});



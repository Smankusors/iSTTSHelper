var userID;
chrome.storage.local.get(['loggedOn','user', 'pass'], function(data) {
	loggedOn = data.loggedOn;
	var flag = document.documentElement.innerHTML.includes("Selamat Datang,");
	if ((loggedOn == true) && (!flag)) {
		$.post( "http://sim.stts.edu/cek_login.php", {user: data.user, pass: data.pass}, function(result){
			if (result == "<script>window.location='index.php'</script>") window.location.replace("index.php");
		});
	}
});



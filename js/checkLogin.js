chrome.storage.local.get(['loggedOn','user', 'pass', 'disableMat'], function(data) {
	$(document).ready(function(){
		if ((data.loggedOn == true) && (!document.documentElement.innerHTML.includes("Selamat Datang,"))) {
			$.post( "http://sim.stts.edu/cek_login.php", {user: data.user, pass: data.pass}, function(result){
				if (result == "<script>window.location='index.php'</script>") window.location.replace("index.php");
				else {
					chrome.storage.local.set({'loggedOn':false});
				}
			});
		}
		if (!data.disableMat) $('body').append('<script src="' + chrome.runtime.getURL('js/materialize.js') + '" />');
	});
	if (!data.disableMat) $('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.runtime.getURL("css/materialize.css") + '" />');
});
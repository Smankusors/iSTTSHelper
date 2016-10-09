console.log("SIM login");
$('.login-form,#login-box').keypress(function (e) {
	if (e.which == 13 || e.keyCode == 13) doLogin();
}); 
$('#login').click(function (){ doLogin(); });

chrome.storage.local.get('user', function(data) {
	if (data.user != null) document.getElementById("user").value = data.user;
});
chrome.storage.local.get('pass', function(data) {
	if (data.pass != null) document.getElementById("pass").value = data.pass;
});

function doLogin() {
	console.log("doLogin!");
	chrome.storage.local.set({'user' : $("#user").val()});
	chrome.storage.local.set({'pass' : $("#pass").val()});
	$('#login').fadeOut(200);
	$.post( "http://sim.stts.edu/cek_login.php", { user: $("#user").val(), pass: $("#pass").val()},function(result){
		$('#login').fadeIn(200);
		if (result == "<script>window.location='index.php'</script>") {
			chrome.storage.local.set({'loggedOn' : true});
			window.location.replace('main.html');
		} else $(".status").html(result);
	});

}
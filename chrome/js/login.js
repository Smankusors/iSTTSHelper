$('body').fadeIn(100);
console.log("SIM login");
$('.login-form,#login-box').keypress(function (e) {
	if (e.which == 13 || e.keyCode == 13) doLogin();
}); 
$('#login').click(function (){ doLogin(); });

chrome.storage.local.get('user', function(data) {
	if (data.user != null) document.getElementById("user").value = data.user;
});

function doLogin() {
	var userID = $("#user").val();
	if (userID == "demo") window.location.replace('demo.html');
	else {
		$('#login').fadeOut(200);
		$.post( "http://sim.stts.edu/cek_login.php", { user: userID, pass: $("#pass").val()},function(result){
			$('#login').fadeIn(200);
			if (result == "<script>window.location='index.php'</script>") {
				chrome.storage.local.set({'user':userID, 'pass':$("#pass").val(), 'loggedOn':true});
				window.location.replace('main.html');
			} else {
				$(".datatext").css("border", "1px solid #f00");
				$(".status").html(result);
			}
		});
	}
}
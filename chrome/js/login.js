$('body').fadeIn(100);
$('.login-form,#login-box').keypress(function (e) {
	if (e.which == 13 || e.keyCode == 13) doLogin();
}); 
$('#login').click(function (){ doLogin(); });
chrome.storage.local.get('user', function(data) {
	if (data.user) $('#user').val(data.user);
});
function doLogin() {
	var userID = $('#user').val();
	var userPass = $("#pass").val();
	$('#login').fadeTo(200, 0);
	$.post("http://sim.stts.edu/cek_login.php",{user:userID,pass:userPass},function(result){
		if (result == "<script>window.location='index.php'</script>") {
			$.get("http://sim.stts.edu/index.php", function(carinama){
				var nama = parseNama(carinama);
				chrome.storage.local.set({'user':userID,'pass':userPass,'loggedOn':true,'nama':nama});
				$('html').fadeOut(100);
				window.setTimeout(function(){ window.location.replace('main.html'); }, 100);
			});
		} else {
			$('#login').fadeTo(200, 1);
			$(".datatext").css("border", "1px solid #f00");
			$(".status").html(result);
		}
	});
}
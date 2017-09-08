$("#login-box").remove();
$("body").append('<div class="search-mat-fab-btn"><img src="images/icon-search.png" id="search-mat-btn" /></div><div id="dark_bg" style="display:none;">&nbsp;</div><div id="search-mat-box" class="dialog" style="display:none;"><div class="dialog-title">Pencarian</div><div class="dialog-content"><input id="cari" type="text" class="search-mat-text" placeholder="Cari" /></div><input value="CARI" type="submit" id="search" class="dialog-btn" /></div>');
$("body").append('<div id="login-dialog" class="dialog" style="display:none"><div class="dialog-header"> <img src="http://smankusors.16mb.com/private/sim_small_logo.png" /><div class="progress" style="display:none;"><div class="indeterminate" /></div></div><div class="dialog-content"> <input name="user" id="user" type="text" placeholder="Username" /> <input id="pass" name="pass" type="password" placeholder="Password" /><p class="status">&nbsp;</p></div> <input value="LOGIN" id="doLogin-btn" name="login" type="button" class="dialog-btn" /></div>');
$(".menu td:first-child li").toggleClass("selected", true);

$("#search-btn").remove();
$("#search-box").remove();
$('.banner-shell').removeAttr("style");
$(".menu td li, .child").click(function(){
	$(".body-mid-container").hide();
	$(".body-left-container").show();
	$(".body-right").show();
	var href = $(this).find(".menu_url").attr('id');	
	if (href != "") {
		if (href=="http://perpustakaan.stts.edu") window.open(href,'_blank');
		else if (href == "update_waktu_bau_banotomatis.php" && ($("#page-updatewaktubaubanotomatis").length)) {}
		else {
			$('.menu').find('li').toggleClass("selected", false);
			$(this).toggleClass("selected", true);
			$("#ui-datepicker-div").remove();
			$(".body-left-container").fadeTo(200, 0, function() {
				$(".body-left").load(href, function () {
					if (href != 'pengumuman.php') $("#div-pengumumanGambar").hide();
					else $("#div-pengumumanGambar").show();
					$(".body-left-container").fadeTo(200, 1);
				});
			});
		}
	}
});
$('.search-mat-fab-btn').click(function (){
	$('#search-mat-box').fadeIn(200);
	$('#dark_bg').fadeTo(200, 0.5);
	$('#cari').focus();
});
$('#search-cancel, #dark_bg').click(function() {
	$('#search-mat-box').fadeOut(200);
	$('#login-dialog').fadeOut(200);
	$('#dark_bg').fadeOut(200);
});
$('#login-btn').unbind('click');
$('#login-btn').click(function (){
	$('#login-dialog').fadeIn(200);
	$('#dark_bg').fadeTo(200, 0.5);
});
function doSearch() {
	$(".body-left-container").fadeTo(200, 0, function() {
		$(".body-left").load("pengumuman.php?cari=" + $("#cari").val().replace(" ", "xxx"), function() {
			$('#search-mat-box').fadeOut(200);
			$('#dark_bg').fadeOut(200);
			$(".body-left-container").fadeTo(200, 1);
		});
	});
}
function doLogin() {
	$('.dialog-header .progress').fadeIn(200);
	$('#doLogin-btn').prop('disabled', true);
	$('.status').fadeOut(200);
	$.post("cek_login.php", { user: $("#user").val(), pass: $("#pass").val()}, function(result){
		$('.dialog-header .progress').fadeOut(200);
		if (result == "<script>window.location='index.php'</script>") {
			/*
			history.pushState(null, "", "index.php");
			$('html').fadeOut(200, function() {
				$.get("index.php", function(index) {
					$('html').html($(index).html());
					console.log($(index).html());
					$('html').fadeIn(200);
				});
			});
			*/
			location.href = "index.php";
		} else {
			$('#doLogin-btn').prop('disabled', false);
			$('.status').fadeIn(200);
			$('.status').html(result);
		}		
	});
}
$('#search').click(function () { doSearch(); });
$('#search-mat-box').keypress(function (e) {
	if(e.which == 13 || e.keyCode == 13) doSearch();
});
$('#login-dialog').keypress(function (e) {
	if(e.which == 13 || e.keyCode == 13) doLogin();
}); 
$('#doLogin-btn').click(function (){ doLogin(); });
$("body").append('<div class="search-mat-fab-btn"><img src="images/icon-search.png" id="search-mat-btn" /></div><div id="dark_bg">&nbsp;</div><div id="search-mat-box"><div class="dialog-title">Pencarian</div><input id="cari" type="text" class="search-mat-text" placeholder="Cari" /><div class="action-bar-mat"><input value="BATAL" type="submit" id="search-cancel" class="submit-mat-btn" /><input value="CARI" type="submit" id="search" class="submit-mat-btn" /></div></div><div class="theme-footer">SIM Material Theme oleh Smankusors (Antony Kurniawan)</div>');
$(".menu td:first-child li").toggleClass("selected", true);
$("#search-btn").remove();
$("#search-box").remove();
$("#search-mat-box").hide();
$("#dark_bg").hide();
$(".menu td li, .child").click(function(){
	$(".body-mid-container").hide();
	$(".body-left-container").show();
	$(".body-right").show();
	var href = $(this).find(".menu_url").attr('id');	
	if (href != "") {
		if (href=="http://perpustakaan.stts.edu") window.open(href,'_blank');
		else if (href == "update_waktu_bau_banotomatis.php" && ($("#page-updatewaktubaubanotomatis").length)) {}
		else {
			$(".body-left-container").fadeTo(200, 0.1);
			$('.menu').find('li').toggleClass("selected", false);
			$(this).toggleClass("selected", true);
			$("#ui-datepicker-div").remove();
			$(".body-left").load(href, function () {
				if (href != 'pengumuman.php') $("#div-pengumumanGambar").hide();
				else $("#div-pengumumanGambar").show();
				$(".body-left-container").fadeTo(200, 1);
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
	$('#dark_bg').fadeOut(200);
});
$('#search').click(function () {
	$(".body-left-container").fadeTo(200, 0.1);
	$(".body-left").load("pengumuman.php?cari=" + $("#cari").val().replace(" ", "xxx"), function() {
		$('#search-mat-box').fadeOut(200);
		$('#dark_bg').fadeOut(200);
		$(".body-left-container").fadeTo(200, 1);
	});
});
$('#search-mat-box').keypress(function (e) {
	if (e.which == 13) {
		$(".body-left-container").fadeTo(200, 0.1);
		$(".body-left").load("pengumuman.php?cari=" + $("#cari").val().replace(" ", "xxx"), function() {
			$('#search-mat-box').fadeOut(200);
			$('#dark_bg').fadeOut(200);
			$(".body-left-container").fadeTo(200, 1);
		});
		return false;
	}
});
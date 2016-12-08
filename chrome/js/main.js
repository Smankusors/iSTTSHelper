var loggedOn = false;
function bacaPengumumanSIM() {
	$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
		if ($('#mNewsSIM').attr('class') == "selected") {
			var parsed = parsePengumumanSIM(result);
			$("#content").html(parsed);
			chrome.storage.local.set({'newsSIM' : parsed});
			$(".link-pengumuman").click(function(){
				var pdfLink = this.href;
				window.open(pdfLink,'_blank');
			});
		}
	});
}
$('#logout').click(function (){
	$.post( "http://sim.stts.edu/logout.php", {},function(){
		chrome.storage.local.set({'loggedOn' : false});
		document.location.replace('main.html');
	});
});
$('#login').click(function (){
	$('body').fadeOut(100);
	window.setTimeout(function(){
	document.location.replace('login.html');
	}, 100);
});
$("#mNewsSIM").click(function() {
	$("#mNewsSIM").toggleClass("selected", true);
	$("#mNewsLab").toggleClass("selected", false);
	$("#mSched").toggleClass("selected", false);
	$("#mAbout").toggleClass("selected", false);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		chrome.storage.local.get('newsSIM', function(data) {
			if (data.newsSIM) $("#content").html(data.newsSIM);
			$("#content").fadeIn(100);
		});
		bacaPengumumanSIM();
	},100);
});
$("#mNewsLab").click(function() {
	$("#mNewsSIM").toggleClass("selected", false);
	$("#mNewsLab").toggleClass("selected", true);
	$("#mSched").toggleClass("selected", false);
	$("#mAbout").toggleClass("selected", false);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		chrome.storage.local.get('newsLab', function(data) {
			if (data.newsLab) $("#content").html(data.newsLab);
			$("#content").fadeIn(100);
		});
		$.get("http://lkomp.stts.edu", function(result) {
			if ($('#mNewsLab').attr('class') == "selected") {
				var parsed = parsePengumumanLab(result);
				$("#content").html(parsed);
				chrome.storage.local.set({'newsLab' : parsed});
				$("#content").fadeIn(100);
			}
		});
	},100);
});
$("#mSched").click(function() {
	$("#mNewsSIM").toggleClass("selected", false);
	$("#mNewsLab").toggleClass("selected", false);
	$("#mSched").toggleClass("selected", true);
	$("#mAbout").toggleClass("selected", false);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		if (loggedOn) {
			chrome.storage.local.get('sched', function(data) {
				if (data.sched) $("#content").html(data.sched);
			});
			$.get("http://sim.stts.edu/jadwal_kul.php", function(jadwal_kul) {
				$.get( "http://sim.stts.edu/jadwal_ujian.php", function(jadwal_ujian){
					$.get( "http://sim.stts.edu/jadwal_prakecc.php", function(jadwal_prakecc){
						if ($('#mSched').attr('class') == "selected") {
							$("#content").html('<br />');
							$("#content").append(parseJadwalKul(jadwal_kul));
							$("#content").append('<br />', parseJadwalUjian(jadwal_ujian));
							$("#content").append('<br />', parseJadwalPrakECC(jadwal_prakecc));
							chrome.storage.local.set({'sched' : $("#content").html()});
						}
					});
				});
			});
		} else {
			$("#content").html('<div class="tengah"><h2>MAAF</h2>Anda harus login dulu sebelum melihat jadwal</div>');
		}
		$("#content").fadeIn(100);
	}, 100);
});
$("#mAbout").click(function() {
	$("#mNewsSIM").toggleClass("selected", false);
	$("#mNewsLab").toggleClass("selected", false);
	$("#mSched").toggleClass("selected", false);
	$("#mAbout").toggleClass("selected", true);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		$("#content").load("about.html", function() {
			var manifest = chrome.runtime.getManifest()
			$("#version").html(manifest.version);
			$("#content").fadeIn(100);
		});
	}, 100);
});
chrome.storage.local.get(['newsSIM','loggedOn','user', 'pass', 'nama'], function(data) {
	if (data.news) $("#content").html(data.news);
	if (data.loggedOn) {
		$(".login").hide();
		loggedOn = true;
		if (data.nama) $("#nama").html(data.nama);
		else {
			$.get( "http://sim.stts.edu/index.php", function(result){
				if (result.includes("Selamat Datang,")) {
					var nama = parseNama(result);
					$("#nama").html(nama);
					chrome.storage.local.set({'nama' : nama});
				} else {
					$.post( "http://sim.stts.edu/cek_login.php", { user: data.user, pass: data.pass }, function(result){
						if (result == "<script>window.location='index.php'</script>") window.location.replace('main.html');
					});
				}
			});
		}
	} else $(".logout").hide();
	bacaPengumumanSIM();
	chrome.browserAction.setBadgeText({text: ""});
});
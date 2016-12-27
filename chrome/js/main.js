var loggedOn = false;
function bacaPengumumanSIM() {
	$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
		if ($('#mNewsSIM').attr('class') == "selected") {
			var parsed = parsePengumumanSIM(result);
			$("#content").html(parsed);
			chrome.storage.local.set({'newsSIM':parsed});
			$(".link-pengumuman").click(function(){ window.open(this.href,'_blank'); });
		}
	});
}
$('#logout').click(function (){
	$.post("http://sim.stts.edu/logout.php",{},function(){
		loggedOn = false;
		chrome.storage.local.set({'loggedOn':false});
		$(".logout").hide();
		$(".login").show();
	});
});
$('#login').click(function (){
	$('body').fadeOut(100);
	window.setTimeout(function(){ document.location.replace('login.html'); }, 100);
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
				var hasil = parsePengumumanLab(result);
				$("#content").html(hasil);
				chrome.storage.local.set({'newsLab':hasil});
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
			$.get("http://sim.stts.edu/jadwal_kul.php", function(kul) {
				$.get("http://sim.stts.edu/jadwal_ujian.php", function(ujian){
					$.get("http://sim.stts.edu/jadwal_prakecc.php", function(prakecc){
						if ($('#mSched').attr('class') == "selected") {
							var hasil = parseJadwal(kul, ujian, prakecc);
							$("#content").html(hasil);
							chrome.storage.local.set({'sched' : hasil});
						}
					});
				});
			});
		} else $("#content").html('<div class="tengah"><h2>MAAF</h2>Anda harus login dulu sebelum melihat jadwal</div>');
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
			$("#version").html(chrome.runtime.getManifest().version);
			$("#content").fadeIn(100);
		});
	}, 100);
});
chrome.storage.local.get(['newsSIM','loggedOn','user', 'pass', 'nama'], function(data) {
	if (data.news) $("#content").html(data.news);
	if (data.loggedOn) {
		$(".login").hide();
		if (data.nama) $("#nama").html(data.nama);
		$.get( "http://sim.stts.edu/index.php", function(result){
			if (result.includes("Selamat Datang,")) loggedOn = true;
			else {
				$.post( "http://sim.stts.edu/cek_login.php", { user: data.user, pass: data.pass }, function(result){
					if (result == "<script>window.location='index.php'</script>") {
					} else {
						chrome.storage.local.set({'loggedOn':false});
						$(".logout").hide();
						$(".login").show();
					}
				});
			}
		});
	} else $(".logout").hide();
	bacaPengumumanSIM();
	chrome.browserAction.setBadgeText({text: ""});
});
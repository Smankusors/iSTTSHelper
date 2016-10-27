$('#logout').click(function (){
	chrome.storage.local.set({'loggedOn' : false});
	$.post( "http://sim.stts.edu/logout.php", {},function(){
		document.location.replace('login.html');
	});
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
		chrome.storage.local.get('sched', function(data) {
			if (data.sched) $("#content").html(data.sched);
			$("#content").fadeIn(100);
		});
		$.get("http://sim.stts.edu/jadwal_kul.php", function(jadwal_kul) {
			$.get( "http://sim.stts.edu/jadwal_ujian.php", function(jadwal_ujian){
				$.get( "http://sim.stts.edu/jadwal_prakecc.php", function(jadwal_prakecc){
					if ($('#mSched').attr('class') == "selected") {
						$("#content").html(parseJadwalKul(jadwal_kul));
						$("#content").append(parseJadwalUjian(jadwal_ujian));
						$("#content").append(parseJadwalPrakECC(jadwal_prakecc));
						chrome.storage.local.set({'sched' : $("#content").html()});
					}
				});
			});
		});
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

var userID, password;
chrome.storage.local.get('news', function(data) {
	if (data.news) $("#content").html(data.news);
});
$.get( "http://sim.stts.edu/index.php", function(data){
	if (data.includes("Selamat Datang,")) {
		$("#nama").html(parseNama(data));
		$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
			var parsed = parsePengumumanSIM(result);
			$("#content").html(parsed);
			chrome.storage.local.set({'newsSIM' : parsed});
			$(".link-pengumuman").click(function(){
				var pdfLink = this.href;
				window.open(pdfLink,'_blank');
			});
			chrome.browserAction.setBadgeText({text: ""});
		});
	} else {
		chrome.storage.local.get('user', function(data2) { userID = data2.user; });
		chrome.storage.local.get('pass', function(data2) {
			$.get( "http://sim.stts.edu/cek_login.php", { user: userID, pass: data2.pass }, function(result){
				if (result == "<script>window.location='index.php'</script>") {
					window.location.replace('main.html');
				} else window.location.replace('login.html');
			});
		});
	}
});
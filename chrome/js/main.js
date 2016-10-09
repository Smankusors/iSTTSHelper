console.log("MENU UTAMA");

chrome.storage.local.get('news', function(data) {
	if (data.news) $("#content").html(data.news);
});

$('#logout').click(function (){
	console.log("logouut");
	chrome.storage.local.set({'loggedOn' : false});
	$.post( "http://sim.stts.edu/logout.php", {},function(){
		document.location.replace('login.html');
	});
});

$("#mNews").click(function() {
	$("#mNews").toggleClass("selected", true);
	$("#mSched").toggleClass("selected", false);
	$("#mAbout").toggleClass("selected", false);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
			parsePengumuman(result);
			$("#content").fadeIn(100);
		});
	},100);
});
$("#mSched").click(function() {
	$("#mNews").toggleClass("selected", false);
	$("#mSched").toggleClass("selected", true);
	$("#mAbout").toggleClass("selected", false);
	$("#content").fadeOut(100);
	window.setTimeout(function(){
		$.get("http://sim.stts.edu/jadwal_kul.php", function(result) {
			parseJadwal(result);
		});
	}, 100);
});
$("#mAbout").click(function() {
	$("#mNews").toggleClass("selected", false);
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


function parsePengumuman(s) {
	var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
	var noscript = div.innerHTML;
	noscript = noscript.replace(/\n.*<p class="sm"/g, '<p class="sm"');
	noscript = noscript.replace(/B\n.*<\/a/g, 'B</a');
	noscript = noscript.replace(/Ditambahkan oleh /g, '');
	noscript = noscript.replace(/<a href="#"(.*)<a href="(.*pdf)".*<\/a>/g, '<a href="http://sim.stts.edu/$2"$1');
	chrome.storage.local.set({'news' : noscript});
	chrome.browserAction.setBadgeText({text: ""});
	$("#content").html(noscript);
	console.log("News updated!");
	$(".link-pengumuman").click(function(){
		var pdfLink = this.href;
		window.open(pdfLink,'_blank');
	});
}

function parseJadwal(s) {
	var html = s.replace(/,.*<\//g,'</');
	html = html.replace(/.*sec([\s\S]*)(Jadwal .*) (Sem.*\))([\s\S]*)<\/div>/, '<h3>$3</h3><h4>$2</h4>');
	html = $(html).find('th:first-child, td:first-child').remove().end();
	html = $(html).find('th:nth-child(2), td:nth-child(2)').remove().end();
	$("#content").html(html);
	$.get( "http://sim.stts.edu/jadwal_ujian.php", function(result){
		html = result.replace(/,.*<\//g,'</');
		html = html.replace(/<br\/>/g, '');
		html = $(html).not(".section-name");
		html = $(html).find('th:first-child, td:first-child').remove().end();
		html = $(html).find('th:nth-child(2), td:nth-child(2)').remove().end();
		$("#content").append(html);
		$.get( "http://sim.stts.edu/jadwal_prakecc.php", function(result){
			html = result.replace(/<p.*(Jadwal .*) Sem.*\)/g, '<h4>$1</h4>');
			html = html.replace(/<br\/>/g, ' ');
			html = html.replace(/<br>/g, '');
			console.log(html);
			html = $(html).find('table:first-of-type th:first-child, table:first-of-type td:first-child').remove().end();
			$("#content").append(html);
			$("#content").fadeIn(100);
		});
	});
}

var userID, password;
$.get( "http://sim.stts.edu/index.php", function(data){
	if (data.includes("Selamat Datang,")) {
		var re = /([\s\S]*)ang, (.*) \<inp.*([\s\S]*)/;
		var fullName = data.replace(re,"$2");
		var abbName = fullName.replace(/ ([A-Z])\w+/g,' $1.');
		$("#nama").html(abbName);
		$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
			parsePengumuman(result);
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

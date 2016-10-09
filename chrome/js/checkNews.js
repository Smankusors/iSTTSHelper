chrome.alarms.create("Sman.CheckSIM", {
  delayInMinutes: 5,
  periodInMinutes: 5
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "Sman.CheckSIM") {
    $.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
		parsePengumuman(result);
	});
  }
});
chrome.browserAction.setBadgeBackgroundColor({ color: [102, 0, 0, 255] });

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
	chrome.storage.local.get('news', function(data) {
		if (data.news != noscript) {
			chrome.browserAction.setBadgeText({text: "!"});
		}
	});
}
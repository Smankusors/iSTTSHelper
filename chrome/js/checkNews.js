chrome.alarms.create("Sman.CheckNews", {
  delayInMinutes: 5,
  periodInMinutes: 5
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "Sman.CheckNews") {
	console.log("Cek cek cek!");
    $.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
		var parsed = parsePengumumanSIM(result);
		chrome.storage.local.get('newsSIM', function(data) {
			if (data.newsSIM != parsed) {
				console.log("SIM ada yang baru!");
				chrome.browserAction.setBadgeText({text: "!"});
			}
		});
	});
	$.get("http://lkomp.stts.edu", function(result) {
		var parsed = parsePengumumanLab(result);
		chrome.storage.local.get('newsLab', function(data) {
			if (data.newsLab != parsed) {
				console.log("Lab ada yang baru!");
				chrome.browserAction.setBadgeText({text: "!"});
			}
		});
	});
  }
});

chrome.browserAction.setBadgeBackgroundColor({ color: [102, 0, 0, 255] });
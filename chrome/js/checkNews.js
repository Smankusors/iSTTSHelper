chrome.alarms.create("Sman.CheckNews", {
  delayInMinutes: 5,
  periodInMinutes: 5
});

function doCheckNews() {
	chrome.storage.local.get(['newsSIM','newsLab'], function(data) {
		$.get("http://sim.stts.edu/pengumuman_data.php", function(result) {
			var parsed = parsePengumumanSIM(result);
			if (data.newsSIM != parsed) {
				chrome.browserAction.setBadgeBackgroundColor({ color: [102, 0, 0, 255] });
				chrome.browserAction.setBadgeText({text: "SIM"});
			} else {
				$.get("http://lkomp.stts.edu", function(result) {
					var parsed = parsePengumumanLab(result);
					if (data.newsLab != parsed) {
						chrome.browserAction.setBadgeBackgroundColor({ color: [4, 120, 142, 255] });
						chrome.browserAction.setBadgeText({text: "LAB"});
					}
				});
			}
		});
	});
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name === "Sman.CheckNews") doCheckNews();
});

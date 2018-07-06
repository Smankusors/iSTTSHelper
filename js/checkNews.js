chrome.alarms.create("Sman.CheckNews",{delayInMinutes:5,periodInMinutes:5});
chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name === "Sman.CheckNews") {
		chrome.storage.local.get(['newsSIM','newsLab'], function(data) {
			$.get("https://old.sim.stts.edu/pengumuman_data.php",function(result) {
				if (data.newsSIM != parsePengumumanSIM(result)) {
					chrome.browserAction.setBadgeBackgroundColor({color:[102,0,0,255]});
					chrome.browserAction.setBadgeText({text:"SIM"});
				} else {
					$.get("http://lkomp.stts.edu",function(result) {
						if (data.newsLab != parsePengumumanLab(result)) {
							chrome.browserAction.setBadgeBackgroundColor({color:[4,120,142,255]});
							chrome.browserAction.setBadgeText({text:"LAB"});
						}
					});
				}
			});
		});
	}
});

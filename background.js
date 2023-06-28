chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var targetUrl = "https://expert.chegg.com/qna/authoring/answer/";
  

  if (tab.url && tab.url.startsWith(targetUrl)) {
    chrome.storage.sync.get("duration", function(data) {
      var duration = data.refreshDuration;
      if (duration && changeInfo.status === "complete" && tab.active) {
        setTimeout(function() {
          chrome.tabs.reload(tabId);
        }, duration * 1000);
      }
    });
  }
});

// page reload function
async function init() {
  const refreshDuration = await chrome.storage.sync.get("duration");
  return refreshDuration.duration;
}

let refreshDuration = null;

init().then((duration) => {
  refreshDuration = duration;
  console.log("Refresh Duration: ", refreshDuration);
  if (refreshDuration > 0) {
    interval = pageReload(refreshDuration);
  }
  else {
    stopPageReload(interval);
  }
});

let interval = null;

function pageReload(refreshDuration) {
  console.log("Starting Page Reload");
  let interval = setInterval(() => {
    console.log("Reloading page");
    window.location.reload();
  }, refreshDuration * 1000);
  return interval;
}

function stopPageReload(interval, startNew = false) {
  if (interval) {
    console.log("Stopping Page Reload");
    clearInterval(interval);
  } else {
    console.log("No page reload to stop");
  }
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.duration?.newValue) {
    const newValue = changes.duration.newValue;
    console.log("Old Refesh Duration: ", changes.duration.oldValue);
    console.log("New Refesh Duration: ", newValue);
    
    refreshDuration = newValue;
    if (changes.duration.oldValue == 0 && newValue > 0) {
      window.location.reload();
    }
  }
});

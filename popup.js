document.addEventListener("DOMContentLoaded", function() {
  var durationInput = document.getElementById("duration");
  var saveButton = document.getElementById("save");
  var stopButton = document.getElementById("stop");

  saveButton.addEventListener("click", function() {
    var duration = parseInt(durationInput.value, 10);
    console.log(duration);
    chrome.storage.sync.set({ duration  });
  });

  stopButton.addEventListener("click", function () {
    durationInput.value = 0;
    var duration = parseInt(durationInput.value, 10);
    console.log(duration);
    chrome.storage.sync.set({ duration });
  });

  async function updateInput() {
    const refreshDuration = await chrome.storage.sync.get("duration")
    durationInput.value = refreshDuration.duration;
  }

  updateInput();
});

document.addEventListener("DOMContentLoaded", function() {
  var durationInput = document.getElementById("duration");
  var saveButton = document.getElementById("save");

  saveButton.addEventListener("click", function() {
    var duration = parseInt(durationInput.value, 10);
    chrome.storage.sync.set({ refreshDuration: duration }, function() {
      console.log("Refresh duration saved: " + duration);
      window.close();
    });
  });
});

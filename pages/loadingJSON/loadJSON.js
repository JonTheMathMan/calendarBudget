var budgetData = {};

budgetData.repeatEventOptions = [
  "daily",
  "weekly - every same day of the week",
  "monthly - same day of the month",
  "interval - every N days",
  "interval - every N weeks",
  "interval - every N Months on the same day of the month"
];

function setLabelText(fileInputElement) {
  var labelElement = document.getElementById("fileFormLabel");
  if (!fileInputElement) {
    alert("Couldn't find the fileinput element.");
    return;
  }
  else if (!fileInputElement.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
    return;
  }
  else if (!fileInputElement.files[0]) {
    alert("Please select a file before clicking 'Submit'");
    return;
  }
  labelElement.innerText = fileInputElement.files[0].name;
  return;
}

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Submit'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      try {
        var fileJson = JSON.parse(lines);
      } catch (e) {
          console.error("can't parse json file", e);
          return
      }
      
      budgetData = fileJson;
      getDropdowns();
      document.getElementById("fileLoadedMsg").textContent = "File Loaded";
      // refresh the main calendar view
      var calendarDaysOfMonthContainer = document.getElementById("daysOfMonthContainer");
      if (calendarDaysOfMonthContainer.externalRefresh != undefined) {
        calendarDaysOfMonthContainer.externalRefresh();
      }
    }
  }

  function saveFile() {
    alert("Calendar Events Budget:\n\nWill overwrite budgetEvents.json in downloads folder.\nIf you are on a phone,\n\t it is reccomended that the downloads folder be set to a path on the SD card in the browser settings.");
	  var a = document.getElementById("saveFile");
  	a.download    = "budgetEvents.json";
  	a.href        = URL.createObjectURL(new Blob([JSON.stringify(budgetData)], {type: "application/json"}));
  }
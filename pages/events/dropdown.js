function convertToDropdownElement(givenElement, options) {
	givenElement.style.border = "solid";
	givenElement.style.borderColor = "black";
	givenElement.style.width = "200px";

	for (var i = givenElement.children.length - 1; i >= 0; i--) {
        givenElement.removeChild(givenElement.children[i]); 
    }
	var selectedField = getDropdownField("select an option");
	givenElement.selectedOptionText = "select an option";
	selectedField.open = false;
	selectedField.onclick = function () {
		selectedField.open = !selectedField.open;
		if (selectedField.open) {
			for (var optionsKey in options) {
				var optionField = {};
				if (Array.isArray(options)) {
					/* [ "fieldname" ] */
					optionField = getDropdownField(options[optionsKey]);
				} else {
					/* {
						"fieldname": true
					} */
					optionField = getDropdownField(optionsKey);
				}
				optionField.onclick = function () {
					selectedField.textContent = this.textContent;
					givenElement.selectedOptionText = selectedField.textContent;
					if (givenElement.id === "repeatIntervalType") {
						toggleValueFieldEnabled(this.textContent);
					}
					selectedField.open = !selectedField.open;
					for (var i2 = givenElement.children.length - 1; i2 > 0; i2--) {
						givenElement.removeChild(givenElement.children[i2]);
					}
				};
				givenElement.appendChild(optionField);
			}
		} else {
			for (var i2 = givenElement.children.length - 1; i2 > 0; i2--) {
				givenElement.removeChild(givenElement.children[i2]);
			}
		}
	};
	givenElement.appendChild(selectedField);
}

function getDropdownField(fieldValue) {
	var dropdownField = document.createElement("div");
	dropdownField.style.height = "40px";
	dropdownField.style.width = "200px";
	dropdownField.style.backgroundImage = "linear-gradient(#333333, black, black)";
	dropdownField.textContent = fieldValue;
	return dropdownField;
}

function toggleValueFieldEnabled(intervalOption) {
	var intervalValueField = document.getElementById("repeatIntervalValue");

	if (["daily", "weekly - every same day of the week", "monthly - same day of the month"].includes(intervalOption)) {
		intervalValueField.value = "";
		intervalValueField.disabled = true;
	} else {
		intervalValueField.disabled = false;
	}
}

function getDropdowns() {
	var dropdowns = document.getElementsByClassName("eventDropdown");
	for (var i = 0; i < dropdowns.length; i++) {
		switch (dropdowns[i].id) {
			case "repeatIntervalType":
				convertToDropdownElement(dropdowns[i], budgetData.repeatEventOptions);
				break;
			case "calendarName":
				if (budgetData.calendars !== undefined && Object.keys(budgetData.calendars).length > 0) {
					convertToDropdownElement(dropdowns[i], budgetData.calendars);
				} else {
					convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
				}
				break;
			case "accountName":
				if (budgetData.accounts !== undefined && Object.keys(budgetData.accounts).length > 0) {
					convertToDropdownElement(dropdowns[i], budgetData.accounts);
				} else {
					convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
				}
				break;
			case "categoryTag":
				if (budgetData.categories !== undefined && Object.keys(budgetData.categories).length > 0) {
					convertToDropdownElement(dropdowns[i], budgetData.categories);
				} else {
					convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
				}
				break;
			default:
				convertToDropdownElement(dropdowns[i], ["no dropdown options"]);
		}
	}
}
getDropdowns();
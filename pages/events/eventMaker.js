function createCalendarEvent() {
	var eventFields = document.getElementsByClassName("createCalendarEvent");
	var eventEntry = {};
	eventEntry["eventID"] = Date.now();
	var emptyValues = ["select an option", "no dropdown options", ""];
	for (var i = 0; i < eventFields.length; i++) {
		var tmpEventFieldVal = emptyValues.includes(eventFields[i].textContent) ? undefined : eventFields[i].textContent;
		if (tmpEventFieldVal !== undefined){
			eventEntry[eventFields[i].id] = tmpEventFieldVal;
			continue;
		}
		tmpEventFieldVal = emptyValues.includes(eventFields[i].value) ? undefined : eventFields[i].value;
		if (tmpEventFieldVal !== undefined){
			eventEntry[eventFields[i].id] = tmpEventFieldVal;
			continue;
		}
		tmpEventFieldVal = emptyValues.includes(eventFields[i].selectedOptionText) ? undefined : eventFields[i].selectedOptionText;
		eventEntry[eventFields[i].id] = tmpEventFieldVal;
	}

	if (eventEntry.date === undefined) {
		alert("Please choose a date for the event on the calendar page.");
		return;
	}

	if (eventEntry.amount != undefined && isNaN(eventEntry.amount)) {
		alert("Please enter a number for amount.");
		return;
	}

	if (eventEntry.repeatIntervalType != undefined && eventEntry.repeatIntervalType.startsWith("interval") && (eventEntry.repeatIntervalValue == undefined || eventEntry.repeatIntervalValue < 1)) {
		alert("Please enter a value greater than 0 when using repeat type 'interval'");
		return;
	}

	if (eventEntry.newCalendarName !== undefined && eventEntry.calendarName !== undefined) {
		alert("Please don't add a new calendar name with an existing calendar name selected.");
		return;
	}

	if (eventEntry.newAccountName !== undefined && eventEntry.accountName !== undefined) {
		alert("Please don't add a new account name with an existing account name selected.");
		return;
	}

	if (eventEntry.newCategoryTag !== undefined && eventEntry.categoryTag !== undefined) {
		alert("Please don't add a new category tag with an existing category tag selected.");
		return;
	}

	if (eventEntry.newCalendarName !== undefined && eventEntry.calendarName === undefined) {
		eventEntry.calendarName = eventEntry.newCalendarName.toLowerCase();
		if (budgetData.calendars === undefined) {
			budgetData.calendars = {};
		}
		budgetData.calendars[eventEntry.newCalendarName.toLowerCase()] = true;
		eventEntry.newCalendarName = undefined;
	}

	if (eventEntry.newAccountName !== undefined && eventEntry.accountName === undefined) {
		eventEntry.accountName = eventEntry.newAccountName.toLowerCase();
		if (budgetData.accounts === undefined) {
			budgetData.accounts = {};
		}
		budgetData.accounts[eventEntry.newAccountName.toLowerCase()] = true;
		eventEntry.newAccountName = undefined;
	}

	if (eventEntry.newCategoryTag !== undefined && eventEntry.categoryTag === undefined) {
		eventEntry.categoryTag = eventEntry.newCategoryTag.toLowerCase();
		if (budgetData.categories === undefined) {
			budgetData.categories = {};
		}
		budgetData.categories[eventEntry.newCategoryTag.toLowerCase()] = true;
		eventEntry.newCategoryTag = undefined;
	}

	for (var i = 0; i < eventFields.length; i++) {
		eventFields[i].textContent = "";
		eventFields[i].value = "";
	}

	getDropdowns();

	if (budgetData.eventsMap === undefined) {
		budgetData.eventsMap = {};
	}
	if (budgetData.events === undefined) {
		budgetData.events = [];
	}
	if (budgetData.repeatingEvents === undefined) {
		budgetData.repeatingEvents = [];
	}
	if (budgetData.monthEvents === undefined) {
		budgetData.monthEvents = {};
	}
	var monthMapKeyDate = new Date(eventEntry.date); 
	var monthMapKey = "" + monthMapKeyDate.getFullYear() + monthMapKeyDate.getMonth();
	if (budgetData.monthEvents[monthMapKey] === undefined) {
		budgetData.monthEvents[monthMapKey] = [];
	}

	budgetData.eventsMap[eventEntry.eventID] = eventEntry;
	budgetData.events.push(eventEntry.eventID);
	if (eventEntry.repeatIntervalType != undefined) {
		budgetData.repeatingEvents.push(eventEntry.eventID);
	} else {
		budgetData.monthEvents[monthMapKey].push(eventEntry.eventID);
	}

	// refresh the main calendar view
	var calendarDaysOfMonthContainer = document.getElementById("daysOfMonthContainer");
	if (calendarDaysOfMonthContainer.externalRefresh != undefined) {
	  calendarDaysOfMonthContainer.externalRefresh();
	}

	// switch back to calendar page
	document.getElementById("calendarPage").hidden = false;
	document.getElementById("newEventPage").hidden = true;
	selectedPage = "calendarPage";
}
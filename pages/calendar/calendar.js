// day of the week column headers
var weekDayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

var weekDayNamesShort = [
	"Sun",
	"Mon",
	"Tues",
	"Wed",
	"Thurs",
	"Fri",
	"Sat"
];

function getNewCalendarView(thisElement, fullSize = true) {

	// var currentDate = new Date();
	var viewMonth = new Date();
	var cyclePeriod = 101;
	var dayBoxHeight = 5 * (cyclePeriod - 1);
	var marginSide = 10;
	if (!fullSize) {
		cyclePeriod = 41;
		dayBoxHeight = cyclePeriod;
	}

	if (!fullSize) {
		weekDayNames = weekDayNamesShort;
	}

	// set date to the first of the month
	viewMonth.setDate(1);

	// show which month is in view
	var viewMonthName = document.createElement("h5");
	thisElement.appendChild(viewMonthName);
	viewMonthName.textContent = viewMonth.toDateString().slice(3, 8) + viewMonth.getFullYear();

	// view previous month
	var prevMonth = function () {
		viewMonth.setMonth(viewMonth.getMonth() - 1);
		viewMonthName.textContent = viewMonth.toDateString().slice(3, 8) + viewMonth.getFullYear();
		showDays();
	};
	var prevMonthButton = document.createElement("button");
	prevMonthButton.onclick = prevMonth;
	prevMonthButton.textContent = "Previous Month";
	thisElement.appendChild(prevMonthButton);

	// view next month
	var nextMonth = function () {
		viewMonth.setMonth(viewMonth.getMonth() + 1);
		viewMonthName.textContent = viewMonth.toDateString().slice(3, 8) + viewMonth.getFullYear();
		showDays();
	};
	var nextMonthButton = document.createElement("button");
	nextMonthButton.onclick = nextMonth;
	nextMonthButton.textContent = "Next Month";
	thisElement.appendChild(nextMonthButton);

	// refresh the day boxes view and remove selected date
	var refreshCalendar = function () {
		thisElement.selectedDate = undefined;
		showDays();
	};
	var refreshButton = document.createElement("button");
	refreshButton.onclick = refreshCalendar;
	thisElement.externalRefresh = refreshCalendar;
	refreshButton.textContent = "Refresh";
	thisElement.appendChild(refreshButton);

	// get week day Header Element For Calendar
	var getWeekDayHeader = function (weekDayIndex, weekDayNames) {
		var weekDayHeader = document.createElement("div");
		weekDayHeader.style.position = "absolute";
		weekDayHeader.style.left = cyclePeriod * weekDayIndex + marginSide;
		weekDayHeader.style.width = cyclePeriod;
		weekDayHeader.style.textAlign = "center";
		weekDayHeader.textContent = weekDayNames[weekDayIndex];
		return weekDayHeader;
	};

	var getWeekDayHeadersContainer = function () {
		var weekDayHeadersContainer = document.createElement("div");
		// weekDayHeadersContainer.id = "weekDayHeaders";
		weekDayHeadersContainer.style.height = 10;
		for (var weekDayIndex in weekDayNames) {
			var weekDayHeader = getWeekDayHeader(weekDayIndex, weekDayNames)
			weekDayHeadersContainer.appendChild(weekDayHeader);
		}
		return weekDayHeadersContainer;
	};

	thisElement.appendChild(getWeekDayHeadersContainer());

	// use chosen date in the create event window
	var createEventWithThisDate = function (e) {
		if (e.cancelBubble) e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();

		viewMonth.setDate(this.getDate());
		document.getElementById("date").value = viewMonth.toDateString();

		// switch to new event page
		document.getElementById("calendarPage").hidden = true;
		document.getElementById("newEventPage").hidden = false;
		selectedPage = "newEventPage";
	};

	// set the selected date for date input
	var setSelectedDate = function () {
		viewMonth.setDate(this.getDate());
		thisElement.selectedDate = new Date(viewMonth.toDateString());
		showDays();
	};

	// update the calendar with the month's day box divs
	var showDays = function () {
		var daysOfMonthContainer = thisElement;
		// five items appended to this element total which is 4 in 0 based indexing
		var expectedDayBoxContainerIndex = 5;
		if (daysOfMonthContainer.children[expectedDayBoxContainerIndex] !== undefined) {
			daysOfMonthContainer.removeChild(daysOfMonthContainer.children[expectedDayBoxContainerIndex]);
		}

		// container divs
		var dayBoxesContainer = document.createElement("div");
		var dayBoxesAbsolutePositionWrapper = document.createElement("div");

		// container divs properties
		dayBoxesContainer.id = "dayBoxesContainer";
		dayBoxesAbsolutePositionWrapper.style.position = "absolute";

		// styling - div position variables
		viewMonth.setDate(1);
		var dayOftheWeek = viewMonth.getDay();
		var weekShift;

		// dayBoxes
		//    day and month maps for viewing events on the calendar
		var dayBoxMap = {};
		var monthMapKey = "" + viewMonth.getFullYear() + viewMonth.getMonth();
		if (budgetData.monthEvents == undefined) {
			budgetData.monthEvents = {};
		}
		var monthEvents = budgetData.monthEvents[monthMapKey];
		if (monthEvents == undefined) {
			monthEvents = [];
		}
		//    adding the dayboxes
		for (var i = 0; i < getMonthLength(viewMonth.getMonth(), viewMonth.getFullYear()); i++) {
			weekShift = i + dayOftheWeek;
			var dayBox = document.createElement("div");
			dayBox.className = "dayBox";
			dayBox.style.left = cyclePeriod * (weekShift % 7) + marginSide;
			dayBox.style.top = dayBoxHeight * Math.floor(weekShift / 7) + marginSide;
			dayBox.style.height = dayBoxHeight;
			dayBox.style.width = cyclePeriod - 1;
			dayBoxesContainer.style.height = dayBoxHeight * Math.floor(weekShift / 7) + dayBoxHeight + 2 * marginSide;
			dayBox.textContent = i + 1;
			dayBox.dateDayNumber = i + 1;
			dayBox.getDate = function () { return this.dateDayNumber; };
			if (
				thisElement.selectedDate != undefined &&
				viewMonth.getMonth() == thisElement.selectedDate.getMonth() &&
				viewMonth.getFullYear() == thisElement.selectedDate.getFullYear() &&
				dayBox.dateDayNumber == thisElement.selectedDate.getDate()
			) {
				dayBox.style["background-color"] = "blue";
			}
			if (fullSize === true) {
				dayBox.onclick = createEventWithThisDate;
			} else {
				dayBox.onclick = setSelectedDate;
			}
			dayBoxMap[dayBox.dateDayNumber] = dayBox;
			dayBoxesAbsolutePositionWrapper.appendChild(dayBox);
		}
		dayBoxesContainer.appendChild(dayBoxesAbsolutePositionWrapper);
		daysOfMonthContainer.appendChild(dayBoxesContainer);

		// viewing events on the calendar
		if (fullSize) {
			for (var i = 0; i < monthEvents.length; i++) {
				var eventOb = budgetData.eventsMap[monthEvents[i]];
				var dayBoxDateToFind = new Date(eventOb.date).getDate();
				dayBoxMap[dayBoxDateToFind].appendChild(getCalendarEventViewer(eventOb));
			}
			if (budgetData.repeatingEvents != undefined) {
				var startDate = new Date(viewMonth.toDateString());
				var endDate = new Date(viewMonth.toDateString());
				startDate.setDate(1);
				endDate.setDate(getMonthLength(endDate.getMonth(), endDate.getFullYear()));
				for (var i = 0; i < budgetData.repeatingEvents.length; i++) {
					var eventOb = budgetData.eventsMap[budgetData.repeatingEvents[i]];
					var [hasRepeatingEvents, occurrences, dates] = eventHasRepeatsInDateWindow(eventOb, startDate, endDate);
					if (!hasRepeatingEvents) {
						continue;
					}
					for (var dateIndex = 0; dateIndex < dates.length; dateIndex++) {
						var dayBoxDateToFind = dates[dateIndex].getDate();
						dayBoxMap[dayBoxDateToFind].appendChild(getCalendarEventViewer(eventOb));
					}
				}
			}
		}
	};
	showDays();
}

getNewCalendarView(document.getElementById("daysOfMonthContainer"));
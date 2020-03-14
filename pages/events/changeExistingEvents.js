function editEvent() {
    // open edit event form in calendar view
}

function duplicateEvent() {
    var newDupeEvent = Object.assign({}, this.eventOb);
    newDupeEvent.eventID = Date.now();

    budgetData.eventsMap[newDupeEvent.eventID] = newDupeEvent;
    budgetData.events.push(newDupeEvent.eventID);
    if (newDupeEvent.repeatIntervalType != undefined) {
        budgetData.repeatingEvents.push(newDupeEvent.eventID);
    } else {
        budgetData.monthEvents[monthMapKey].push(newDupeEvent.eventID);
    }

    // refresh the main calendar view
    var calendarDaysOfMonthContainer = document.getElementById("daysOfMonthContainer");
    if (calendarDaysOfMonthContainer.externalRefresh != undefined) {
        calendarDaysOfMonthContainer.externalRefresh();
    }
}

function deleteEvent() {
    // remove event id from arrays and maps
    var eventID = this.eventOb.eventID;
    if (!eventID) {
        alert("could not find eventID to delete");
        return;
    }

    // events list
    if (budgetData.events.includes(eventID)) {
        var eventsIndex = budgetData.events.indexOf(eventID);
        if (eventsIndex < 0) {
            alert("could not remove eventID from all events list: ", eventID);
        } else {
            budgetData.events.splice(eventsIndex, 1);
        }
    } else {
        alert("could not remove eventID from all events list: not found: ", eventID);
    }

    // there should never be an eventID in both repeating events list and months map events list
    if (this.eventOb.repeatIntervalType) {
        // repeating events list
        if (budgetData.repeatingEvents.includes(eventID)) {
            var repeatingEventsIndex = budgetData.repeatingEvents.indexOf(eventID);
            if (repeatingEventsIndex < 0) {
                alert("could not remove eventID from repeating events list: ", eventID);
            } else {
                budgetData.repeatingEvents.splice(repeatingEventsIndex, 1);
            }
        } else {
            alert("could not remove eventID from repeating events list: not found: ", eventID);
        }
    } else {
        // month map events list
        var monthMapKeyDate = new Date(eventEntry.date);
        var monthMapKey = "" + monthMapKeyDate.getFullYear() + monthMapKeyDate.getMonth();
        if (budgetData.monthEvents[monthMapKey] && budgetData.monthEvents[monthMapKey].includes(eventID)) {
            var monthEventsIndex = budgetData.monthEvents[monthMapKey].indexOf(eventID);
            if (monthEventsIndex < 0) {
                alert("could not remove eventID from months map events list: ", eventID);
            } else {
                budgetData.monthEvents[monthMapKey].splice(monthEventsIndex, 1);
            }
        } else {
            alert("could not remove eventID from months map events list: not found: ", eventID);
        }
    }

    // eventMap - delete actual eventObject from budgetData
    if (budgetData.eventsMap.hasOwnProperty(eventID)) {
        delete budgetData.eventsMap[eventID];
    } else {
        alert("could not remove event entry from all events map: not found: ", eventID);
    }

    // refresh the main calendar view
    var calendarDaysOfMonthContainer = document.getElementById("daysOfMonthContainer");
    if (calendarDaysOfMonthContainer.externalRefresh != undefined) {
        calendarDaysOfMonthContainer.externalRefresh();
    }
}
function appendLeftHeaderTableRow(table, header, value) {
    var row = document.createElement("tr");
    var headerElement = document.createElement("th");
    var rowValue = document.createElement("td");

    headerElement.innerText = header;
    rowValue.innerText = value;

    row.appendChild(headerElement);
    row.appendChild(rowValue);
    table.appendChild(row);
    return;
}

function appendSingleColumnTableRow(table, value) {
    var row = document.createElement("tr");
    var rowValue = document.createElement("td");

    rowValue.innerText = value;

    row.appendChild(rowValue);
    table.appendChild(row);
    return;
}

// converts camelcase to title with spaces "eyeOfTheTiger" -> "Eye Of The Tiger"
function camelcaseToTitle(text) {
    var result = text.replace(/([A-Z])/g, " $1");
    var result2 = result.replace(/(^[a-z])/, result.match(/(^[a-z])/)[0].toUpperCase());
    return result2;
}


function getCalendarEventViewer(eventOb) {
    var eventViewerBox = document.createElement("div");
    eventViewerBox.style.backgroundColor = "#3377ff";
    eventViewerBox.style.borderTop = "solid";
    eventViewerBox.style.borderWidth = 1;
    eventViewerBox.style.borderColor = "darkblue";
    var smallTable = document.createElement("table");
    var expandedTable = document.createElement("table");
    expandedTable.hidden = true;
    
    // add buttons
    var closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.hidden = true;
    var editButton = document.createElement("button");
    editButton.innerText = "Close";
    editButton.hidden = true;
    var duplicateButton = document.createElement("button");
    duplicateButton.innerText = "Close";
    duplicateButton.hidden = true;
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Close";
    deleteButton.hidden = true;

    // functions from changeExistingEvents.js
    editButton.eventOb = eventOb;
    duplicateButton.eventOb = eventOb;
    deleteButton.eventOb = eventOb;
    editButton.onclick = editEvent;
    duplicateButton.onclick = duplicateEvent;
    deleteButton.onclick = deleteEvent;

    // table main color
    smallTable.style.color = "black";
    expandedTable.style.color = "black";

    // normal view
    appendSingleColumnTableRow(smallTable, eventOb.categoryTag);
    appendSingleColumnTableRow(smallTable, eventOb.amount);
    appendSingleColumnTableRow(smallTable, eventOb.memo);

    // expanded view
    for (var key in eventOb) {
        if (key === "eventID") {
            continue;
        }
        if (eventOb[key] == undefined) {
            continue;
        }
        appendLeftHeaderTableRow(expandedTable, camelcaseToTitle(key), eventOb[key]);
    }

    eventViewerBox.expanded = false;
    var newExpanding = new CustomEvent("newExpanding");
    newExpanding.originElement = eventViewerBox;
    eventViewerBox.expand = function(e) {
        if (e.cancelBubble) e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();

        dispatchEvent(newExpanding);
        eventViewerBox.expanded = true;
        eventViewerBox.style.zIndex = 3;
        var parentDayBoxWidth = Math.floor(eventViewerBox.parentElement.style.width);
        eventViewerBox.parentElement.style.width = isNaN(parentDayBoxWidth) ? 300 : 3 * parentDayBoxWidth;
        eventViewerBox.parentElement.style.zIndex = 2;
        eventViewerBox.parentElement.style.boxShadow = "-3px 3px 5px";
        smallTable.hidden = true;
        closeButton.hidden = false;
        editButton.hidden = false;      
        duplicateButton.hidden = false;
        deleteButton.hidden = false;
        expandedTable.hidden = false;
    }
    eventViewerBox.onclick = eventViewerBox.expand;
    eventViewerBox.collapse = function(e) {
        if (e.cancelBubble) e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();

        eventViewerBox.expanded = false;
        eventViewerBox.style.zIndex = 0;
        var parentDayBoxWidth = Math.floor(eventViewerBox.parentElement.style.width);
        eventViewerBox.parentElement.style.width = isNaN(parentDayBoxWidth) ? 100 : Math.floor(parentDayBoxWidth/3);
        eventViewerBox.parentElement.style.zIndex = 0;
        eventViewerBox.parentElement.style.boxShadow = "0px 0px 0px";
        expandedTable.hidden = true;
        closeButton.hidden = true;
        editButton.hidden = true;
        duplicateButton.hidden = true;
        deleteButton.hidden = true;
        smallTable.hidden = false;
    }
    closeButton.onclick = eventViewerBox.collapse;

    this.addEventListener("newExpanding", collapseForOtherEvents); 
    function collapseForOtherEvents(e) {
        if (e.originElement == eventViewerBox) {
            return;
        }
        eventViewerBox.collapse(e);
    }

    eventViewerBox.appendChild(closeButton);
    eventViewerBox.appendChild(smallTable);
    eventViewerBox.appendChild(expandedTable);
    return eventViewerBox;
}
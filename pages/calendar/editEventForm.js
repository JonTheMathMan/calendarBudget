function getEditForm() {
    var editForm = document.createElement("form");
    var dateEntry = document.createElement("div");
    var repeatIntervalType = document.createElement("select");
    var calendarName = document.createElement("select");
    var newCalendarName = document.createElement("input");
    var accountName = document.createElement("select");
    var newAccountName = document.createElement("input");
    var categoryTag = document.createElement("select");
    var newCategoryTag = document.createElement("input");
    var amount = document.createElement("input");
    var memo = document.createElement("input");
    var notes = document.createElement("input");

    getFormSelectOptions(repeatIntervalType, budgetData.repeatEventOptions);
    getFormSelectOptions(calendarName, budgetData.calendars);
    getFormSelectOptions(accountName, budgetData.accounts);
    getFormSelectOptions(categoryTag, budgetData.categories);

    
}

function getFormSelectOptions(selectEl, options) {
    for (var optI = 0; optI<options.length; optI++) {
        let opt = document.createElement("option");
        opt.innerText = options[optI];
        selectEl.AppendChild(opt);
    }
}

/* 
date
repeatIntervalType
repeatIntervalValue
calendarName
newCalendarName
accountName
newAccountName
categoryTag
newCategoryTag
amount
memo
notes
*/
var eventMakerHtml = `<div id="createEventContainer" style="background-color:#111111;position:relative;">
            <p>Date:</p>
            <textarea disabled=true class="createCalendarEvent" id="date"></textarea>
            <p>Repeat Interval Type:</p>
            <div class="createCalendarEvent eventDropdown" id="repeatIntervalType"></div>
            <p>Repeat Interval Value:</p>
            <textarea disabled=true class="createCalendarEvent" id="repeatIntervalValue"></textarea>
            <p>Calendar Name:</p>
            <div class="createCalendarEvent eventDropdown" id="calendarName"></div>
            <p>New Calendar Name:</p>
            <textarea class="createCalendarEvent" id="newCalendarName"></textarea>
            <p>Account Name:</p>
            <div class="createCalendarEvent eventDropdown" id="accountName"></div>
            <p>New Account Name:</p>
            <textarea class="createCalendarEvent" id="newAccountName"></textarea>
            <p>Category Tag:</p>
            <div class="createCalendarEvent eventDropdown" id="categoryTag"></div>
            <p>New Category Tag:</p>
            <textarea class="createCalendarEvent" id="newCategoryTag"></textarea>
            <p>Amount:</p>
            <textarea class="createCalendarEvent" id="amount"></textarea>
            <p>Memo:</p>
            <textarea class="createCalendarEvent" id="memo"></textarea>
            <p>Notes (For long notes that won't show on the unexpanded calendar):</p>
            <textarea class="createCalendarEvent" id="notes"></textarea>
            <br/>
            <br/>
            <button onclick="createCalendarEvent()">Create Event</button>
        </div>`;
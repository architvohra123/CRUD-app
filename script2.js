//////////////////////////////////    MAIN JAVASCRIPT    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const currentDate = new Date();             //Inbuilt consructor function Date() to create an object
let year=currentDate.getFullYear();         //int year is fetched
let month= currentDate.getMonth()+1;        //int month is fetched
let prevD=null;                             //previous selected (green) date
let hasEvent = {};                          //Hash set/array to check if any date has an event or not (true/false)
let eventData = {};                         //hash map/ to store event corresponding to its date as key
let currSelected=null;                      // currently selected date
const monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function saveToLocalStorage() {                                             //updation of local storage
    localStorage.setItem('hasEvent', JSON.stringify(hasEvent));             
    localStorage.setItem('eventData', JSON.stringify(eventData));
}

function loadFromLocalStorage() {                                           //fetch data stored in local storage to global ds: hasEvent[] and eventData[]
    const hasEventData = localStorage.getItem('hasEvent');              
    const eventDataData = localStorage.getItem('eventData');

    //assigning the fetched data
    if (hasEventData) {
        hasEvent = JSON.parse(hasEventData);
    }

    if (eventDataData) {
        eventData = JSON.parse(eventDataData);
    }
}

// Load data from local storage when the page loads
loadFromLocalStorage();

// Update local storage whenever 'hasEvent' or 'eventData' change
function updateLocalStorage() {
    saveToLocalStorage();
}




// Get references to the year-select and month-select elements
const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");

// Function to populate the year drop-down list
function populateYearSelect() {
    const startYear = year-30; // Set the start year as per your requirements
    const currentYear = year;

    // Clear existing options
    yearSelect.innerHTML = '';

    // Add options for each year in the range
    for (let y = startYear; y <= currentYear+30; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Set the selected year to the current year
    yearSelect.value = currentYear;
}

// Function to populate the month drop-down list
function populateMonthSelect() {
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Clear existing options
    monthSelect.innerHTML = '';

    // Add options for each month
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = monthNames[month - 1];
        monthSelect.appendChild(option);
    }

    // Set the selected month to the current month (add 1 to get the correct index)
    monthSelect.value = new Date().getMonth() + 1;
}

// Call the functions to populate the year and month drop-down lists
populateYearSelect();
populateMonthSelect();


yearSelect.addEventListener("change", updateCalendar);
monthSelect.addEventListener("change", updateCalendar);

// Function to update the calendar based on the selected year and month
function updateCalendar() {
    const selectedYear = parseInt(yearSelect.value, 10);
    const selectedMonth = parseInt(monthSelect.value, 10);
    year=selectedYear;
    month=selectedMonth;
    // Update the year and month, then regenerate the calendar
    generateCalendar(selectedYear, selectedMonth);
}



function generateCalendar(year, month){
    const currentDate = new Date();
    const dd=currentDate.getDate();
    const mm=currentDate.getMonth()+1;
    const yy=currentDate.getFullYear();
    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarBody =document.getElementById("calendar-body");
    const monthYear =document.getElementById("month-year");
    calendarBody.innerHTML="";
    monthYear.textContent = monthNames[month-1]+" "+year;

    calendarBody.appendChild(document.createElement("tr"));

    for(let i=0;i<startingDay;i++){                                             // for filling up empty cells
        const cell = document.createElement("td");
        cell.textContent="";
        calendarBody.lastChild.appendChild(cell);
    }

    let day=1;
    for(let i=0;i<=6-startingDay;i++){                                          // for filling up first row of cells
        const cell = document.createElement("td");
        cell.textContent=day;

        const icon=document.createElement("i");
        icon.className="bi bi-emoji-laughing";
        icon.style.display="none";
        const date=new Date(year, month - 1, cell.textContent);
        const formattedDate = date.toLocaleDateString("en-GB");
        if(hasEvent[formattedDate]){
            icon.style.display="";
        }
        cell.append(icon);

        if(i==0 && startingDay==0) cell.style.color="red";
        if(day==dd && month==mm && yy==year){
            cell.style.backgroundColor="#D3D3D3";
        }
        calendarBody.lastChild.appendChild(cell);
        day++;

        cell.addEventListener("mouseover", function() {
            if(cell.style.backgroundColor=="lime"){
                return;
            }
            cell.style.backgroundColor = "blue";
            cell.style.color = "white";
        });
        cell.addEventListener("click", function() {
            currSelected=cell.textContent;
            const selected=document.getElementById("selected");
            selected.innerHTML=`Event Data for ${year} ${monthNames[month-1]} ${cell.textContent}`;
            cell.style.backgroundColor="lime";
            if(prevD!=null && prevD!=cell){
                prevD.style.backgroundColor = "";
                prevD.style.color = "";
                if((i-(cell.textContent-prevD.textContent))%7==0){
                    prevD.style.color="red";
                }
                if(prevD.textContent==dd && month==mm && yy==year){
                    prevD.style.backgroundColor="#D3D3D3";
                }
            }
            prevD=cell;
            showEventForm(new Date(year, month - 1, cell.textContent));
        });
        cell.addEventListener("mouseout", function() {
            if(cell.style.backgroundColor=="lime"){
                return;
            }

            cell.style.backgroundColor = "";
            cell.style.color = "";
            if(i%7==0 && startingDay==0){
                cell.style.color="red";
            }
            if(cell.textContent==dd && month==mm && yy==year){
                cell.style.backgroundColor="#D3D3D3";
            }
        });
    }


    for(let i = 0; day<=daysInMonth; day++, i++){                                   // for filling rest of the rows
        if((i)%7==0){
            calendarBody.appendChild(document.createElement("tr"));
        }
        const cell = document.createElement("td");
        cell.textContent = day;

        const icon=document.createElement("i");
        icon.className="bi bi-emoji-laughing";
        icon.style.display="none";
        const date=new Date(year, month - 1, cell.textContent);
        const formattedDate = date.toLocaleDateString("en-GB");
        if(hasEvent[formattedDate]){
            icon.style.display="";
        }
        cell.append(icon);

        if(i%7==0){
            cell.style.color="red";
        }
        if(day==dd && month==mm && yy==year){
            cell.style.backgroundColor="#D3D3D3";
        }
        calendarBody.lastChild.appendChild(cell);

        cell.addEventListener("mouseover", function(){
            if(cell.style.backgroundColor=="lime") return;
            cell.style.backgroundColor = "blue";
            cell.style.color = "white";
        });
        cell.addEventListener("click", function() {
            currSelected=cell.textContent;
            const selected=document.getElementById("selected");
            selected.innerHTML=`Event Data for ${year} ${monthNames[month-1]} ${cell.textContent}`;
            cell.style.backgroundColor="lime";
            if(prevD!=null && prevD!=cell){
                prevD.style.backgroundColor = "";
                prevD.style.color = "";
                if((i-(cell.textContent-prevD.textContent))%7==0){
                    prevD.style.color="red";
                }
                if(prevD.textContent==dd && month==mm && yy==year){
                    prevD.style.backgroundColor="#D3D3D3";
                }
            }
            prevD=cell;
            showEventForm(new Date(year, month - 1, cell.textContent));
        });
        cell.addEventListener("mouseout", function() {
            if(cell.style.backgroundColor=="lime") return;
            cell.style.backgroundColor = "";
            cell.style.color = "";
            if(i%7==0){
                cell.style.color="red";
            }
            if(cell.textContent==dd && month==mm && yy==year){
                cell.style.backgroundColor="#D3D3D3";
            }
        });
    }
}

document.onload = generateCalendar(year, month);

function decMonth(){
    if(month==1){
        month=12;
        generateCalendar(--year, month);
    }else generateCalendar(year, --month);
}
function incMonth(){
    if(month==12){
        month=1;
        generateCalendar(++year, month);
    }else generateCalendar(year, ++month);
}

// Function to display the event form when a date is clicked
function showEventForm(date) {
    const eventForm = document.getElementById("event-form");
    const eventInput = document.getElementById("event-input");
    const eventDataDisplay = document.getElementById("event-data"); // New

    eventForm.style.display = "block";
    // Retrieve event data from the eventData object based on the selected date
    const formattedDate = date.toLocaleDateString("en-GB");
    const eventDataForDate = eventData[formattedDate] || "No event for this date"; // Display a message if no event

    // Update the event data section with the retrieved event data
    eventDataDisplay.textContent = eventDataForDate;


    eventForm.onsubmit = function (e) {
        e.preventDefault();
        const eventDescription = eventInput.value;
        if (eventDescription) {
            eventData[formattedDate] = eventDescription;
            eventInput.value = "";
            eventForm.style.display = "none";

            hasEvent[formattedDate]=true;

            // Update the event data section after adding an event
            eventDataDisplay.textContent = eventDescription;
            generateCalendar(date.getFullYear(), date.getMonth()+1);
            updateLocalStorage();
        }
    };

    // Update the input field with the event data for the selected date
    // eventInput.value = eventDataForDate;
}

const deleteEvent=document.getElementById("deleteEvent");
deleteEvent.addEventListener("click", function(){
    const currDate=new Date(year, month - 1, currSelected);
    const formattedDate=currDate.toLocaleDateString("en-GB");
    const eventInput=document.getElementById("event-input");
    const eventDataDisplay=document.getElementById("event-data");
    const eventForm=document.getElementById("event-form");
    delete eventData[formattedDate];
    delete hasEvent[formattedDate];
    eventInput.value = "";
    eventForm.style.display = "none";
    eventDataDisplay.textContent="Event Deleted";
    generateCalendar(currDate.getFullYear(), currDate.getMonth()+1);
    saveToLocalStorage();
});


const today=document.getElementById("today");
today.addEventListener("click", ()=>{
    year=(new Date()).getFullYear();
    month=(new Date()).getMonth()+1;
    generateCalendar(year, month);
});
//////////////////////////////////    MAIN JAVASCRIPT    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const currentDate = new Date();             //Inbuilt consructor function Date() to create an object
let year=currentDate.getFullYear();         //int year is fetched
let month= currentDate.getMonth()+1;        //int month is fetched
let prevD=null;
let wasSun=false;                             //previous selected (green) date
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

loadFromLocalStorage();                                                     // Load data from local storage when the page loads                                     


const yearSelect = document.getElementById("year-select");                  //select drop down elements of both year and month list
const monthSelect = document.getElementById("month-select");


function populateYearSelect() {                                             //Populate the year drop-down list
    const startYear = year-30; 
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

    // Set the selected year to current year
    yearSelect.value = currentYear;
}


function populateMonthSelect() {                                            //Populate the month drop-down list
    
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

                                                                        // Calling both functions to populate drop-down list
populateYearSelect();
populateMonthSelect();


yearSelect.addEventListener("change", updateCalendar);                  // updation of calendar on changing selected month/year
monthSelect.addEventListener("change", updateCalendar);

                                                                        //Update the calendar based on the selected year and month
function updateCalendar() {
    const selectedYear = parseInt(yearSelect.value, 10);
    const selectedMonth = parseInt(monthSelect.value, 10);
    year=selectedYear;
    month=selectedMonth;
    // Update the year and month, then regenerate the calendar
    generateCalendar(selectedYear, selectedMonth);
}



function generateCalendar(year, month){                                 // generate calendar with given year and month
    const currentDate = new Date();

    const dd=currentDate.getDate();
    const mm=currentDate.getMonth()+1;                                  //current dd/mm/yy
    const yy=currentDate.getFullYear();

    const firstDay = new Date(year, month-1, 1);                        //date object of selected year n month of 1st date 
    const lastDay = new Date(year, month, 0);                           //date object of selected year n month of last date        
    const daysInMonth = lastDay.getDate();                              //number of days in month (29, 28, 30, 31);
    const startingDay = firstDay.getDay();                              //day on 1st date of that month
    const endDay=lastDay.getDay();
    const calendarBody =document.getElementById("calendar-body");       //select tbody element
    const monthYear =document.getElementById("month-year");             //select th to show which date we are currently on
    calendarBody.innerHTML="";                                              
    monthYear.textContent = monthNames[month-1]+" "+year;

    calendarBody.appendChild(document.createElement("tr"));             //insert a row in tbody

    for(let i=0;i<startingDay;i++){                                             // for filling up empty cells of month 
        const cell = document.createElement("td");                              // creating cell to insert cell-content in that td of tr
        cell.textContent="";
        calendarBody.lastChild.appendChild(cell);
    }

    let day=1;                                                                  //days start from (int) 1 to total days in month 
    for(let i=0;i<=6-startingDay;i++){                                          // for filling up first row of cells
        const cell = document.createElement("td");
        cell.textContent=day;

        const icon=document.createElement("i");                                 // if there was an event to that corresponding cell
        icon.className="bi bi-emoji-laughing";                                  // we will display an icon to highlight that cell
        icon.style.display="none";
        const date=new Date(year, month - 1, cell.textContent);
        const formattedDate = date.toLocaleDateString("en-GB");                 //converting date obj into key used in hasEvent{} 
        if(hasEvent[formattedDate]){                                            //check if event is there for that cell
            icon.style.display="";
        }
        cell.append(icon);

        if(i==0 && startingDay==0) cell.style.color="red";                      //for sundays cell content should be red
        if(day==dd && month==mm && yy==year){                                   
            cell.style.backgroundColor="#D3D3D3";                               //if it is today's date it should be highlighted
        }
        calendarBody.lastChild.appendChild(cell);                               //last child of tbody->tr is appended with this new td
        day++;

        cell.addEventListener("mouseover", function() {                         // on hover cell becomes highlighted
            hoverIn(cell);
        });
        cell.addEventListener("click", function() {                             //select the cell
            clickCell(cell, i, dd, mm, yy);                                     //DISPLAY FORM FOR TAKING USER INPUT
        });
        cell.addEventListener("mouseout", function() {                          // un-highlight the cell  
            hoverOut(cell, i, dd, mm, yy);
        });
    }


    for(let i = 0; day<=daysInMonth; day++, i++){                                   // for filling rest of the rows
        if((i)%7==0){                                                               // performing similar actions same as adding first row
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
            hoverIn(cell);
        });
        cell.addEventListener("click", function() {
            clickCell(cell, dd, mm, yy);
        });
        cell.addEventListener("mouseout", function(){
            hoverOut(cell, dd, mm, yy);
        });
    }
    
    for(let i=endDay;i<6;i++){
        const cell=document.createElement("td");
        cell.textContent="";
        calendarBody.lastChild.appendChild(cell);
    }
}


function hoverIn(cell){
    if(cell.style.backgroundColor=="chocolate") return;
    cell.style.backgroundColor = "blue";
    cell.style.color = "white";
}

function clickCell(cell, dd, mm, yy){
    let isSun=true;
    if((new Date(year, month-1, cell.textContent)).getDay()==0){
        isSun=true;
    }else{
        isSun=false;
    }
    currSelected=cell.textContent;
    const selected=document.getElementById("selected");
    selected.innerHTML=`Event Data for ${year} ${monthNames[month-1]} ${cell.textContent}`;
    cell.style.backgroundColor="chocolate";
    if(prevD!=null && prevD!=cell){
        prevD.style.backgroundColor = "";
        prevD.style.color = "";
        if(wasSun){
            prevD.style.color="red";
        }
        if(prevD.textContent==dd && month==mm && yy==year){
            prevD.style.backgroundColor="#D3D3D3";
        }
    }
    prevD=cell;
    wasSun=isSun;
    showEventForm(new Date(year, month - 1, cell.textContent));
}

function hoverOut(cell, dd, mm, yy){
    if(cell.style.backgroundColor=="chocolate") return;
    cell.style.backgroundColor = "";
    cell.style.color = "";
    if((new Date(year, month-1, cell.textContent)).getDay()==0){
        cell.style.color="red";
    }
    if(cell.textContent==dd && month==mm && yy==year){
        cell.style.backgroundColor="#D3D3D3";
    }
}

document.onload = generateCalendar(year, month);

function decMonth(){                                                    // decrease month by 1
    if(month==1){
        month=12;
        generateCalendar(--year, month);
    }else generateCalendar(year, --month);
}
function incMonth(){                                                    // increase month by 1
    if(month==12){
        month=1;
        generateCalendar(++year, month);
    }else generateCalendar(year, ++month);
}

function showEventForm(date) {                                          // display the event form when a date is clicked
    const eventForm = document.getElementById("event-form");
    const eventInput = document.getElementById("event-input");
    const eventDataDisplay = document.getElementById("event-data");

    eventForm.style.display = "block";
    // Retrieve event data from the eventData object based on the selected date
    const formattedDate = date.toLocaleDateString("en-GB");
    const eventDataForDate = eventData[formattedDate] || "No event for this date"; // Display a message if no event

    // Update the event data section with the retrieved event data
    eventDataDisplay.textContent = eventDataForDate;


    eventForm.onsubmit = function (e) {                                             //Creating a key value pair in hash map for new entry
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
            saveToLocalStorage();
        }
    };

    // Update the input field with the event data for the selected date
    // eventInput.value = eventDataForDate;
}

const deleteEvent=document.getElementById("deleteEvent");                       //for deletingthe event corresponding to its date in hash map
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

function viewAllEvents() {
    window.location.href = '../Event-Page/events.html';
}
const currentDate = new Date();
let year=currentDate.getFullYear();
let month= currentDate.getMonth()+1;

function generateCalendar(year, month){
    const monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

    for(let i=0;i<startingDay;i++){
        const cell = document.createElement("td");
        cell.textContent="";
        calendarBody.lastChild.appendChild(cell);
    }

    let day=1;
    for(let i=0;i<=6-startingDay;i++){
        const cell = document.createElement("td");
        cell.textContent=day;
        if(i==0 && startingDay==0) cell.style.color="red";
        if(day==dd && month==mm && yy==year){
            cell.style.backgroundColor="#D3D3D3";
        }
        cell.addEventListener("mouseover", function() {
            // Code to execute when the mouse hovers over the element
            cell.style.backgroundColor = "blue";
            cell.style.color = "white";
        });



        cell.addEventListener("click", function() {
            showEventForm(new Date(year, month - 1, cell.textContent));
        });



        cell.addEventListener("mouseout", function() {
            // Code to execute when the mouse leaves the element
            // Reset to default text color
            cell.style.backgroundColor = "";
            cell.style.color = "";
            if(i%7==0 && startingDay==0){
                cell.style.color="red";
            }
            if(cell.textContent==dd && month==mm && yy==year){
                cell.style.backgroundColor="#D3D3D3";
            }
        });



        calendarBody.lastChild.appendChild(cell);
        day++;
    }


    for(let i = 0; day<=daysInMonth; day++, i++){
        if((i)%7==0){
            calendarBody.appendChild(document.createElement("tr"));
        }
        const cell = document.createElement("td");
        cell.textContent = day;
        if(i%7==0){
            cell.style.color="red";
        }
        if(day==dd && month==mm && yy==year){
            cell.style.backgroundColor="#D3D3D3";
        }


        cell.addEventListener("mouseover", function() {
            // Code to execute when the mouse hovers over the element
            cell.style.backgroundColor = "blue";
            cell.style.color = "white";
        });



        cell.addEventListener("click", function() {
            showEventForm(new Date(year, month - 1, cell.textContent));
        });



        cell.addEventListener("mouseout", function() {
            // Code to execute when the mouse leaves the element
            // Reset to default text color
            cell.style.backgroundColor = "";
            cell.style.color = "";
            if(i%7==0){
                cell.style.color="red";
            }
            if(cell.textContent==dd && month==mm && yy==year){
                cell.style.backgroundColor="#D3D3D3";
            }
        });

        calendarBody.lastChild.appendChild(cell);

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

const eventData = {};

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

            // Update the event data section after adding an event
            eventDataDisplay.textContent = eventDescription;
        }
    };

    // Update the input field with the event data for the selected date
    // eventInput.value = eventDataForDate;
}

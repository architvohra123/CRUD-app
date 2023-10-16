// function to check if form is valid or not
function validateForm(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    
    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(age == ""){
        alert("Age is required");
        return false;
    }
    else if(age<1){
        alert("Age cannot be zero or less");
        return false;
    }

    if(address==""){
        alert("Address is required");
        return false;
    }

    if(email==""){
        alert("Email is required");
        return false;
    }
    else if(!email.includes("@")){
        alert("Enter valid email address");
        return false;
    }

    return true;
}

// function to show data from local storage
function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html="";

    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index +')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });
    console.log("ok ji");
    document.querySelector("#crudTable tbody").innerHTML = html;
}

//loads all data when document or page load
document.onload = showData();

//function to add data to local storage
function AddData(){
    //if form is valid
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        
        peopleList.push({
            name : name,
            age: age,
            address: address,
            email: email,
        })
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}


//function to delete data from local storage
function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList=[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//function to update data in local storage
function updateData(index){
    //submit will hide and update button will appear
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    
    
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList=[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm()==true){
            peopleList[index].name=document.getElementById("name").value;
            peopleList[index].age=document.getElementById("age").value;
            peopleList[index].address=document.getElementById("address").value;
            peopleList[index].email=document.getElementById("email").value;
            
            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();
            alert("Data Updated at S.no->"+(index+1));


            //empty all the fields
            document.getElementById("name").value="";
            document.getElementById("age").value="";
            document.getElementById("address").value="";
            document.getElementById("email").value="";
            
            
            //update will hide and submit button will appear
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

            
        }
    }
}
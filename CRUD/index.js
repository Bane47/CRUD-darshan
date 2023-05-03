function render(PatientName='') {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Patient?PatientName_like=${PatientName}`);
    xhttp.send();               //sending the request

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += '<td><img width="50px" src="' +
                    object["PatientImage"] +
                    '" class="avatar"></td>';;
                trHTML += "<td>" + object['PatientName'] + "</td>";
                trHTML += "<td>" + object['Age'] + "</td>";
                trHTML += "<td>" + object['Sex'] + "</td>";
                trHTML += "<td>" + object['VisitingDate'] + "</td>";
                trHTML += "<td>" + object['Complaint'] + "</td>";
                trHTML += '<td><button type="button" onclick="showUserEditBox(' + object["id"] + ')" style="background-color:DodgerBlue" class="btn1 rounded m-1 font-weight-bold"  ><span class="text" >Edit</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></path</svg></span></button>';

                trHTML += '<button type="button" class="btn1 noselect rounded m-1" onclick="userDelete(' + object["id"] + ')"><span class="text" >Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></td>';

                trHTML += '</tr>';

            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    }
}

render();

function search() {
    const pname = document.getElementById("searchvalue").value;
    render(pname);
  }



function showUserCreateBox() {
    Swal.fire({
        title: "Register Patient Details",
        html:
            '<form name="form">'+
            '<input id="id" type="hidden">' +
            '<label for="PatientName">Name</label>'+
            '<input id="PatientName" class="swal2-input " placeholder="Name"><br> ' +
            '<label for="Age">Age</label>'+
            '<input id="Age" class="swal2-input me-3" placeholder="Age"><br> ' +
            '<div class="mt-1" >'+
            
            '<label for="Sex">Gender&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>'+
            '<input class="swal2-radio" type="radio" name="sex" value="Male" placeholder="Gender">Male<input class="swal2-radio" type="radio" name="sex" value="Female" >Female<br> '+
            '</div>'+
            '<label for="VisitingDate">Visiting Date</label>'+ 
            '<input id="VisitingDate" class="swal2-input " placeholder="Date"><br> ' +
            '<label for="Complaint">Complaint</label>'+
            '<input id="Complaint" class="swal2-input me-2"placeholder="Complaint"><br> '+
            '</form>',
        preConfirm: () => {

            // const valid = validate();
            // console.log(valid)
            // if(valid==true){
            // console.log("Success");

            userCreate();
            // }

        }
    });
}

function userCreate() {

    const pname = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const sex =document.form.sex.value;     

const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;

    
    if (validate() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/Patient");
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire(objects["message"]);

            }
        }
        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: "https://www.melivecode.com/users/1.png",
            })
        );
        render();

    }
    //    else{
    // Swal.fire({
    //     title:"User creation unsuccessful",
    //     icon:"Error"

    // })
    //    }

}

function validate() {
    //field values
    const name = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const vdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const sex =document.form.sex.value;     

    //regular expressions
    const nameReg = /^[a-zA-Z\s]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const vdateReg = /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-3])$/;

    if (name == "" || age == "" || vdate == "" || sex == "" || complaint == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        }).then((res) => {
            if(res.value){
                showUserCreateBox();
            }
        });
        return false;
    }
    if (!name.match(nameReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Name should only contain alphabetical letters",
            icon: "error",
            showConfirmButton: true,

        })
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }
    if (!vdate.match(vdateReg)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please follow the format (dd-mm-yyyy) for the date  field",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }

    if (name.match(nameReg) && age.match(ageReg) && vdate.match(vdateReg)) {
        Swal.fire({
            title: "Successfully Created",
            icon: "success",
            showConfirmButton: true

        })
        return true;


    }



}

// function showUserEditBox(id){
//     console.log(id);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("Get",`http://localhost:3000/Patient/${id}`);
//     xhttp.send();
//     xhttp.onreadystatechange= function (){
//         if(this.readyState==4 && this.status == 200){
//             const objects = JSON.parse(this.responseText);
//             console.log(objects);
//             Swal.fire({
//                 title:"Edit User",
//                 html:
//                 '<input id="id" type="hidden" value="'+objects[`$(id)`]+'">'+
//                 '<input id="PatientName" class="swal2-input" placeholder="Name" value="'+
//                 objects[`PatientName`]+
//                 '">'+
//                 '<input id="Age" class="swal2-input" placeholder="Age" value="'+objects[`Age`]+'">'+
//                 '<input id="Sex" class="swal2-input" placeholder="Sex" value="'+objects[`Sex`]+'">'+
//                 '<input id="VisitingDate" class="swal2-input" placeholder="VisitingDate" value="'+objects[`VisitingDate`]+'">'+
//                 '<input id="Complaint" class="swal2-input" placeholder="Enter your Complaint" value="'+objects[`Complaint`]+'">',
//                 preconfirm:() => {
//                     // const valid=validate();
//                     // if (valid){
//                     userEdit(id);
//                     // }
//                     // return false;
//                 },

//             });
//         }
//     };
// }

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Patient/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            console.log(objects)
           var male, female;
                if (objects['Sex']=='Female'){
                   female =true
                   male=false

                }
                else{
                   male = true
                   female=false
                }
                // if (objects['Sex']=='Male'){
                //     male =true
                // }
                // else{
                //     male = false
                // }
            console.log(male,female)
            console.log(objects['Sex']);
            Swal.fire({
                title: "Edit Patient Details",
                html:
           
'<form name="form">'+
                    '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
                    '<label for="PatientName">Name</label>'+

                    '<input id="PatientName" class="swal2-input" required type="text" value="' + objects[`PatientName`] + '"><br>' +
                    '<label for="Age">Age</label>'+

                    '<input id="Age" type="text" class="swal2-input" value="' + objects[`Age`] + '">' +
                    '<div class="mt-1" >'+
            
            '<label for="Sex">Gender&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>'+
            
            `<input class="swal2-radio" type="radio" name="sex" checked=${male} placeholder="Gender">Male<input class="swal2-radio" type="radio" name="sex" checked="false" >Female<br> `+
            '</div>'+
                    '<label for="VisitingDate">Visiting Date</label>'+ 

                    '<input id="VisitingDate" type="text" class="swal2-input" value="' + objects[`VisitingDate`] + '">' +
                    '<label for="Complaint">Complaint</label>'+

                    '<input id="Complaint" type="text" class="swal2-input"  value="' + objects[`Complaint`] + '">'+
                    '</form>',

                preConfirm: () => {
                    userEdit(id);
                }
            })
        }
    }
}
function validate2() {
    //field values
    const name = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const vdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const sex =document.form.sex.value;     

    //regular expressions
    const nameReg = /^[a-zA-Z\s]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const vdateReg = /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-2])$/;

    if (name == "" || age == "" || vdate == "" || sex == "" || complaint == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        })
        return false;
    }
    if (!name.match(nameReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Name should only contain alphabetical letters",
            icon: "error",
            showConfirmButton: true,

        })
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }
    if (!vdate.match(vdateReg)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please follow the format (dd-mm-yyyy) for the date  field",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }

    if (name.match(nameReg) && age.match(ageReg) && vdate.match(vdateReg)) {
        Swal.fire({
            title: "Successfully Edited",
            icon: "success",
            showConfirmButton: true

        })
        return true;




    }



}

// function userEdit(id) {
//     const empname = document.getElementById("empname").value;
//     const DOJ = document.getElementById("DOJ").value;
//     const department = document.getElementById("department").value;
//     const designation = document.getElementById("designation").value;
//     const salary = document.getElementById("salary").value;
//     console.log(empname);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(
//         JSON.stringify({
//             empname: empname,
//             DOJ: DOJ,
//             department: department,
//             designation: designation,
//             salary: salary,
//             image: "https://www.melivecode.com/users/1.png",
//         })
//     );

//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             const objects = JSON.parse(this.responseText);
//             Swal.fire(objects["message"]);
//             loadTable();
//         }
//     }
// }




function userEdit(id) {
    console.log("Helloworld");
    const pname = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const sex= document.form.sex.value;
    const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    console.log("Hell yeah");
    if (validate2() == true) {

        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/Patient/${id}`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: "https://www.melivecode.com/users/1.png"

            })
        );
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire({
                    title: "Successfully Edited",
                    icon: "success"
                });
                render();
            }
        }
    }



}

function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/Patient/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Swal.fire({
        title: "Loading...",
        text: "Your operation is being processed, Please wait",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
                Swal.hideLoading();
                Swal.fire({
                    title: "Do you want to delete this?",
                    text: "You will not be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes , delete it!'
                }).then((result) => {
                    if (result.value) {
                        xhttp.send(
                            JSON.stringify({
                                id: id,
                            }));
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                render();
                            }
                        };
                    }
                });

            }, 500);
        }
    })
}


//Search option
// function render(PatientName = '') {
//     const xhttp = new XMLHttpRequest();
//     console.log(PatientName);
//     xhttp.open("GET", `http://localhost:3000/Patient?PatientName like=${PatientName}`);
//     xhttp.send();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             var trHTML = "";
//             const objects = JSON.parse(this.responseText);
//             for (let object of objects) {
//                 trHTML += "<tr>";
//                 trHTML += "<td>" + object["id"] + "</td>";

//                 trHTML += "<td>" + object["PatientName"] + "</td>";
//                 trHTML += "<td>" + object["Age"] + "</td>";
//                 trHTML += "<td>" + object["Sex"] + "</td>";
//                 trHTML += "<td>" + object["VisitingDate"] + "</td>";
//                 trHTML += "<td>" + object["Complaint"] + "</td>";
//                 trHTML +=
//                     '<td><img width="50px" src="' + object["PatientImage"] +'" class="avatar"></td>';

//                     // trHTML += '<td><button type="button" onclick="showUserEditBox(' + object["id"] + ')" style="background-color:DodgerBlue" class="btn1 rounded m-1 font-weight-bold"  ><span class="text" >Edit</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></path</svg></span></button>';

//                     trHTML += '<button type="button" class="btn1 noselect rounded m-1" onclick="userDelete(' + object["id"] + ')"><span class="text" >Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></td>';
    
//                 trHTML += "</tr>";
//             }
//             document.getElementById("mytable").innerHTML = trHTML;
//         }
//     };
// }
// render();
// function searchTable() {
//     const pname = document.getElementById("searchInput").value;
//     render(pname);
// }

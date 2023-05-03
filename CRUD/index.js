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
                trHTML += '<td><img width="50px" height="50px" style="border-radius:50%" src="' +
                    object["PatientImage"] +
                    '" class="avatar"></td>';;
                trHTML += "<td>" + object['PatientName'] + "</td>";
                trHTML += "<td>" + object['Age'] + "</td>";
                trHTML += "<td>" + object['Sex'] + "</td>";
                trHTML += "<td>" + object['VisitingDate'] + "</td>";
                trHTML += "<td>" + object['Complaint'] + "</td>";
                trHTML += '<td><button type="button" onclick="showUserEditBox(' + object["id"] + ')" style="color: black; background-color: yellow;" class="btn1 rounded m-1 font-weight-bold text-black"  ><span class="text" >Edit</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></path</svg></span></button>';

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
            '<label class="form-label mx-5" for="PatientImage">Upload Patient image</label>'+
            '<input type="file" class="mx-5 form-control w-75" id="PatientImage" />'+
            '<label for="PatientName">Name</label>'+
            '<input id="PatientName" class="swal2-input " placeholder="Name"><br> ' +
            '<label for="Age">Age</label>'+
            '<input id="Age" class="swal2-input me-3" placeholder="Age"><br> ' +
            '<label for="Sex">Sex</label>'+
            '<input type="text" id="Sex" class="swal2-input text" placeholder="Male/Female/Other"><br>'+
            '<label for="VisitingDate">Visiting Date</label>'+ 
            '<input id="VisitingDate" class="swal2-input" type="datetime-local" placeholder="Date"><br> ' +
            '<label for="Complaint">Complaint</label>'+
            '<input id="Complaint" class="swal2-input me-2"placeholder="Complaint"><br> '+
            '</form>',
            showConfirmButton:true,
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
const sex = document.getElementById("Sex").value.toLowerCase();
const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
const filename = document.getElementById("PatientImage").files[0];



if(filename===undefined){
    Swal.fire({
        title: "Fields cannot be empty",
        icon: "error",
        showConfirmButton: true,
        timer: 9000,
        customClass: {
          popup: "frosted-glass",
        },
      }).then((res) => {
        console.log(res);
        if (res.value) {
          // Call the function recursively after showing the error message
          showUserCreateBox();
        }
      });
      return;
    }

    
    if (validate() == true) {
        console.log("hiii");
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/Patient");
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire(objects["message"]);

            }
        }
        const imgpath = "./assets/images/" + filename.name;
        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: imgpath
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
    const filename = document.getElementById("PatientImage").files[0];
    const name = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const vdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const sex = document.getElementById("Sex").value.toLowerCase();

    //const sex =document.form.sex.value;     

    //regular expressions
    const nameReg = /^[a-zA-Z\s]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const sexReg =/^\b(male|female|other)\b$/

    if(filename===undefined){
        Swal.fire({
            title:"Please give the image",
            icon:"error",
            showConfirmButton: true
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserCreateBox();
        });
        return false;
    }
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

        }).then(() => {
            // prevent closing the popup when there's an error
            showUserCreateBox(objects[`${id}`]);
        });
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserCreateBox();
        });
        return false;

    }

    if(!sex.match(sexReg)){
        Swal.fire({
            title:"Invalid Input",
            text:"Please enter the gender (Male or Female or Other)",
            icon:"error",
            showConfirmButton: true
            
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserCreateBox();
        });
        return false;
    }

    if (name.match(nameReg) && age.match(ageReg) && sex.match(sexReg)) {
        Swal.fire({
            title: "Successfully Created",
            icon: "success",
            showConfirmButton: true

        })
        
        return true;

    }

}

function showUserEditBox(id) {
    console.log(id);
    document.getElementById("num").value=id;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Patient/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            console.log(objects)
          
            Swal.fire({
                title: "Edit Patient Details",
                html:
           
                    '<form name="form">'+
                    '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
                    '<label class="form-label mx-5" for="PatientImage">Upload Patient image</label>'+
                    '<input type="file" class="mx-5 form-control w-75" id="PatientImage" />'+
                    '<label for="PatientName">Name</label>'+
                    '<input id="PatientName" class="swal2-input" required type="text" value="' + objects[`PatientName`] + '"><br>' +
                    '<label for="Age">Age</label>'+

                    '<input id="Age" type="text" class="swal2-input" value="' + objects[`Age`] + '"><br>' +
                    '<label for="Sex">Sex</label>'+
                    '<input type="text" id="Sex" class="swal2-input text" value="'+objects[`Sex`]+'"><br>'+
                    
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
    const filename = document.getElementById("PatientImage").files[0];

    //const sex =document.form.sex.value;     
    const sex = document.getElementById("Sex").value.toLowerCase();

    //regular expressions
    const nameReg = /^[a-zA-Z\s]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const sexReg =/^\b(male|female|other)\b$/



    if(filename===undefined){
        Swal.fire({
            title:"Please give the image",
            icon:"error",
            showConfirmButton: true
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserEditBox(document.getElementById("num").value);
        });
        return false;
    }
    if (name == "" || age == "" || vdate == "" || sex == "" || complaint == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserEditBox(document.getElementById("num").value);
        });
        return false;
    }
    if (!name.match(nameReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Name should only contain alphabetical letters",
            icon: "error",
            showConfirmButton: true

        }).then(() => {
            // prevent closing the popup when there's an error
            showUserEditBox(document.getElementById("num").value);
        });
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserEditBox(document.getElementById("num").value);
        });
        return false;

    }
 console.log(sex);
    if(!sex.match(sexReg)){
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter the gender as Male or Female or Other",
            icon: "error",
            showConfirmButton: true
        }).then(() => {
            // prevent closing the popup when there's an error
            showUserEditBox(document.getElementById("num").value);
        });
        return false;
    }

    if (name.match(nameReg) && age.match(ageReg) && sex.match(sexReg)) {
        Swal.fire({
            title: "Successfully Edited",
            icon: "success",
            showConfirmButton: true

        })
        return true;
    }
    else{
        return false;
    }



}

function userEdit(id) {
    console.log("Helloworld");
    const pname = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    // const sex= document.form.sex.value;
    const sex = document.getElementById("Sex").value.toLowerCase();
    const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const filename = document.getElementById("PatientImage").files[0];
    console.log("Hell yeah");
    if (validate2() == true) {

        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/Patient/${id}`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const imgpath = "./assets/images/" + filename.name;
        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: imgpath

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
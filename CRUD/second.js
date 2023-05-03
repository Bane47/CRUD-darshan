//https://javascript.info/xmlhttprequest#http-headers
// npm install -g json-server
// json-server --watch db.json in Terminal(command prompt)
function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/employees");
  xhttp.send();
  //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest 
  //XMLHttpRequest Methods and Properties
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          '<td><img width="50px" src="' +
          object["avatar"] +
          '" class="avatar"></td>';
        trHTML += "<td>" + object["fname"] + "</td>";
        trHTML += "<td>" + object["lname"] + "</td>";
        trHTML += "<td>" + object["username"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')">Edit</button>';
        trHTML +=
//delete button

        '<button type="button" class="noselect"><span class="text" onclick="userDelete(' +
        object["id"] +
        ')">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></td>'

        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showUserCreateBox() {
  //https://sweetalert2.github.io/v9.html
  Swal.fire({
    title: "Create user",
    html:
      '<input id="id" type="hidden">' +
      '<input id="fname" class="swal2-input" placeholder="First">' +
      '<input id="lname" class="swal2-input" placeholder="Last">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">',
    preConfirm: () => {
      userCreate();
    },
  });
}

function userCreate() {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/employees/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: "https://www.melivecode.com/users/1.png",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/employees/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["objects"];
      console.log(objects);
      Swal.fire({
        title: "Edit User",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="fname" class="swal2-input" placeholder="First" value="' +
          objects["fname"] +
          '">' +
          '<input id="lname" class="swal2-input" placeholder="Last" value="' +
          objects["lname"] +
          '">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="' +
          objects["username"] +
          '">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="' +
          objects["email"] +
          '">',
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

function userEdit(id) {
  //const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  console.log(id);
  console.log(fname);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      // id: id,
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: "https://www.melivecode.com/users/1.png",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/employees/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      // Swal.fire(objects["message"]);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          objects["message"];
        }
      })
    }
    //loadTable();
  };
}



function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/company/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      xhttp.send(JSON.stringify({ id: id }));
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          loadTable();
        }
      };
    }
  });
}


function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/employees/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: "Edit Employee",
        html:
          '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
          '<input id="empname" class="swal2-input" required type="text" value="' + objects[`empname`] + '">' +
          '<input id="DOJ" type="text" class="swal2-input" value="' + objects[`DOJ`] + '">' +
          '<input id="department" type="text" class="swal2-input" value="' + objects[`department`] + '">' +
          '<input id="designation" type="text" class="swal2-input" value="' + objects[`designation`] + '">' +
          '<input id="salary" type="text" class="swal2-input"  value="' + objects[`salary`] + '">',
        preConfirm: () => {
          userEdit(id);
        }
      })
    }
  }
}

function userEdit(id) {
  const empname = document.getElementById("empname").value;
  const DOJ = document.getElementById("DOJ").value;
  const department = document.getElementById("department").value;
  const designation = document.getElementById("designation").value;
  const salary = document.getElementById("salary").value;
  console.log(empname);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      empname: empname,
      DOJ: DOJ,
      department: department,
      designation: designation,
      salary: salary,
      image: "https://www.melivecode.com/users/1.png",
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  }
}




function loadTable(empname = '') {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/employees?empname_like=${empname}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["empname"] + "</td>";
        trHTML += "<td>" + object["DOJ"] + "</td>";
        trHTML += "<td>" + object["department"] + "</td>";
        trHTML += "<td>" + object["designation"] + "</td>";
        trHTML += "<td>" + object["salary"] + "</td>";
        trHTML += '<td><img style="width:50px;height:50px" src="' + object["image"] + '"></td>';
        trHTML += '<td><ul class="list-inline m-0"><li class="list-inline-item"> <button class="btn btn-warning btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onclick="showUserEditBox(' + object["id"] + ')"><i class="fa fa-edit"></i></button></li><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onclick="userDelete(' + object["id"] + ')"><i class="fa fa-trash"></i></button></li></ul></td>'
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

// searching
function search() {
  const empname = document.getElementById("searchvalue").value;
  loadTable(empname);
}
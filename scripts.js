window.onload = () => {
    initSelects()
}

function initSelects() {
    let employees = getEmployees();
    for (let i = 0; i < 6; i++) {
        for (let employee of employees) {
            var select = document.getElementById("select" + (1 + i));
            var option = document.createElement("option");
            option.text = employee;
            select.add(option);
        }
    }
}

function getHours() {
    let acc = [];
    for (let i = 0; i < numRows; i++) {
        let val = document.getElementById("hours" + (1 + i)).value;
        (val != '') ? acc.push(parseInt(val)) : acc.push(0);
    }
    return acc;
}

function calculateTips() {
    let hours = getHours();
    let totalHours = hours.reduce((a, b) => a + b, 0);
    let totalTips = document.getElementById('totalTips').value;
    let payPerHour = totalTips / totalHours;
    let pay = [];
    // console.log(hours)
    // console.log(pay)

    for (let i in hours) {
        pay.push((payPerHour * hours[i]).toFixed(2));
    }
    let divs = document.getElementsByClassName("earned");
    for (let i in divs) {
        divs[i].innerText = "$" + pay[i]
    }
}

function addEmployee() {
    let name = prompt("What is the name of the employee you would like to add?");
    let employees = getEmployees();
    employees.push(name);
    setCookie("employees", employees, 500);
    for (let i=0; i<6; i++) {
        var select = document.getElementById("select" + (1 + i));
        var option = document.createElement("option");
        option.text = name;
        console.log("adding", option)
        select.add(option);
    }
}

function removeEmployee() {
    let name = prompt("What is the name of the employee you would like to remove?")
    let employees = getEmployees();
    employees.splice(employees.indexOf(name), 1)
    console.log(employees)
    setCookie("employees", employees, 500)
    for (let i=0; i<6; i++) {
        var select = document.getElementById("select" + (1 + i));
        for (let j=0; j<select.options.length; j++) {
            
            if (select.options[j].innerText == name) {
                console.log('removing', select.options[j].innerText)
                select.options[j] = null;
                break;
            }
        }
    }
}

function getEmployees() {
    let cookie = getCookie("employees")
    console.log(cookie)
    if (cookie == null) {
        return [""];
    } else {
        return cookie.split(",");
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
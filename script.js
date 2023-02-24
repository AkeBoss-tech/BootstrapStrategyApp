// Make sure third party cookies aren't blocked
if (typeof myList == "undefined") {
    var myList = [["11/4/2022 8:49:8","AD","DCMP",12,"A",1,"on",1,1,1,1,1,1,1,"L","N","qw"]]
}

if (typeof text == "undefined") {
    var text = ""
}

console.log(text)

document.getElementById("saved").innerText = localStorage.getItem("data");
// let a = new QRCode(document.getElementById("qrcode"), "www.google.com");


if (localStorage.getItem("data") === null) {
    myList =  [] 
} else {
    myList = JSON.parse(localStorage.getItem("data"))
    text += localStorage.getItem("data")
}

if (localStorage.getItem("initials") === null) {
    localStorage.setItem("initials", "") 
} else {
    document.getElementById("initials").defaultValue = localStorage.getItem("initials");
    text += localStorage.getItem("initials")
}

if (localStorage.getItem("tablet") === null || localStorage.getItem("tablet") === "") {
    localStorage.setItem("tablet", "") 
} else {
    // document.getElementById("tabletId").value = localStorage.getItem("tablet");
    if (localStorage.getItem("tablet") != "") {
        document.getElementById(localStorage.getItem("tablet").toLowerCase() + "_button").checked = true
        text += localStorage.getItem("tablet")
    }
}
if (localStorage.getItem("event") === null) {
    localStorage.setItem("event", "") 
} else {
    document.getElementById("event").defaultValue = localStorage.getItem("event");
    text += localStorage.getItem("event")
}

if (localStorage.getItem("match") === null || localStorage.getItem("match") === "") {
    localStorage.setItem("match", "") 
} else {
    document.getElementById("match_id").value = parseInt(localStorage.getItem("match")) + 1;
    text += localStorage.getItem("match")
}

document.getElementById("resultant").text = text

function incrementID(id_string, num) { 
    var input = document.getElementById(id_string);
    input.value = parseInt(input.value) + num;
    if (parseInt(input.value) > parseInt(input.max)) {
        input.value = input.max;
    } else if (parseInt(input.value) < parseInt(input.min)) {
        input.value = input.min;
    }
}

function makeQRCodes() {
    let list = document.getElementById('qrList')
    list.innerHTML = ""
    let x = 0
    for (const things of myList){
        let divider = document.createElement('div')
        let breaker = document.createElement('br')
        divider.id = 'qrcode' + x
        
        list.appendChild(divider)
        list.appendChild(breaker)
        new QRCode(document.getElementById("qrcode" + x), JSON.stringify(things).slice(1, -1));
        x += 1
    }
}

makeQRCodes()

function refreshData() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        let stringVersion = JSON.stringify(myList)
        /* let totalString = ""
        for (const stringData of myList) {
            let b = JSON.stringify(stringData).slice(1, -1)
            totalString += b
            totalString += '\n'
        }
        localStorage.setItem("data", stringVersion); */

        // Retrieve
        localStorage.setItem("data", stringVersion);
        document.getElementById("result").innerText = stringVersion;
        new QRCode(document.getElementById("qrcode"), stringVersion);
        
        setCookie("data", stringVersion, 7)
    } else {
      document.getElementById("result").innerText = "Sorry, your browser does not support Web Storage...";
    }

    
}

refreshData()
var form = document.forms[0]
form.addEventListener('submit', (event) => {
    // stop form submission
    let currentdate = new Date(); 
    let datetime = (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate() + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    localStorage.setItem("initials", form.elements["initials"].value) 
    localStorage.setItem("tablet", form.elements["tabletId"].value) 
    localStorage.setItem("event", form.elements["event"].value)
    localStorage.setItem("match", form.elements["match_id"].value)
    myList.push([
        // things in the beginning 
        datetime,
        form.elements["initials"].value,
        form.elements["event"].value,
        parseInt(form.elements["match_id"].value),
        form.elements["tabletId"].value,
        parseInt(form.elements["team_num"].value),

        // Game specefic
        // auto
        form.elements["preload"].value,
        form.elements["cross"].checked.toString(),
        parseInt(form.elements["auto_low_cone"].value),
        parseInt(form.elements["auto_mid_cone"].value),
        parseInt(form.elements["auto_high_cone"].value),
        parseInt(form.elements["auto_low_cube"].value),
        parseInt(form.elements["auto_mid_cube"].value),
        parseInt(form.elements["auto_high_cube"].value),
        form.elements["auto_position"].value,
        
        parseInt(form.elements["tele_low_cone"].value),
        parseInt(form.elements["tele_mid_cone"].value),
        parseInt(form.elements["tele_high_cone"].value),
        parseInt(form.elements["tele_low_cube"].value),
        parseInt(form.elements["tele_mid_cube"].value),
        parseInt(form.elements["tele_high_cube"].value),

        parseInt(form.elements["tele_low_cone_drop"].value),
        parseInt(form.elements["tele_mid_cone_drop"].value),
        parseInt(form.elements["tele_high_cone_drop"].value),
        parseInt(form.elements["tele_low_cube_drop"].value),
        parseInt(form.elements["tele_mid_cube_drop"].value),
        parseInt(form.elements["tele_high_cube_drop"].value),
        
        form.elements["end_charge_pos"].value,
        form.elements["malfunction"].checked.toString(),
        
        form.elements["notes"].value,
    ])

    console.log(myList)

    refreshData()
    
    // form.preventDefault()
});

function clearData() {
    localStorage.removeItem("data");
    localStorage.removeItem("initials") 
    localStorage.removeItem("match") 
    localStorage.removeItem("tablet") 
    localStorage.removeItem("event") 
    location.reload()
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

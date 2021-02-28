function create() {
  let args = document.getElementById('wip').value
  let argz = document.getElementById('wip1').value
  if (!args || !argz) {
    alert("Arguments are required.")
    return;
  }
  let xhr = new XMLHttpRequest()
  xhr.open("GET", "/create?item=" + args + "&user=" + argz)
  xhr.send()
  document.getElementById('wip').value = ""
  document.getElementById('wip1').value = ""
  alert("Created!")
}

function checkPass() {
  location.href = '/didLogin?password=' + document.getElementById('txt').value
}

/*let ADMINPASSWORDS = {
  Hunter: "HUNTER122","yooperhunter2@yahoo.com"
  Nam: null
}

let ADMINUSERNAMES = {
  Hunter: "HUNTER","Hunter","TBOX Hunter"
  Nam: "Nam"
}*/
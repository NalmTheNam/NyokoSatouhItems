function create() {
  let args = document.getElementById('wip').value
  let argz = document.getElementById('wip1').value
  if (args.startsWith(" ") || argz.startsWith(" ")) {
    alert("No arguments or blank arguments. (make sure you don't include spaces at the start)")
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
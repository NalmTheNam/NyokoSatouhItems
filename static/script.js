function create() {
  let args = document.getElementById('wip').value
  let argz = document.getElementById('wip1').value
  if (args.startsWith(" ") || argz.startsWith(" ") || !args || !argz) return M.toast({html: "No arguments or blank arguments. (make sure you don't include spaces at the start)", classes: "red"})
  let xhr = new XMLHttpRequest()
  xhr.open("GET", "/create?item=" + args + "&user=" + argz)
  xhr.send()
  document.getElementById('wip').value = ""
  document.getElementById('wip1').value = ""
  M.toast({html: 'Created!'})
}

function checkPass() {
  location.href = '/didLogin?password=' + document.getElementById('txt').value
}

/*
function checkUsername() {
  location.href = '/didLogin?username=' + document.getElementById('txt2').value
}
*/
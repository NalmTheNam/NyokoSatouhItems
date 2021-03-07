const rick = "href"
const lS = localStorage

function create() {
  let args = document.getElementById('wip').value
  let argz = document.getElementById('wip1').value
  if (args.startsWith(" ") || argz.startsWith(" ") || !args || !argz) return M.toast({html: "No arguments or blank arguments. (make sure you don't include spaces at the start)", classes: "red"})
  if (args.includes(rick) || argz.includes(rick)) return M.toast({html: "href is blocked to prevent rickrolls", classes: "red"})
  let xhr = new XMLHttpRequest()
  xhr.open("POST", "/create?item=" + args + "&user=" + argz)
  xhr.send()
  document.getElementById('wip').value = ""
  document.getElementById('wip1').value = ""
  M.toast({html: 'Created!', classes: "green"})
}

function checkPass() {
  location.href = '/didLogin?password=' + document.getElementById('txt').value
}

function toggleDarkMode() { 
  if (lS.dark) delete lS.dark
  else lS.dark = true
  location.reload()
}

function createAdminAcc() {
  let args = document.getElementById('wip2').value
  let argz = document.getElementById('wip3').value
  if (args.startsWith(" ") || argz.startsWith(" ") || !args || !argz) return M.toast({html: "No arguments or blank arguments. (make sure you don't include spaces at the start)", classes: "red"})
  let xhr = new XMLHttpRequest()
  xhr.open("POST", "/createAdminAccount?name=" + args + "&password=" + argz)
  xhr.send()
  document.getElementById('wip2').value = ""
  document.getElementById('wip3').value = ""
  M.toast({html: 'Created!', classes: "green"})
}

if (lS.dark) {
  document.body.style.backgroundColor = "#111212"
  document.body.style.color = "white"
  document.getElementsByClassName("news-ticker")[0].style.backgroundColor = "white"
  document.getElementsByClassName("news-ticker")[0].style.color = "black"
  document.getElementsByClassName("black")[0].style.color = "black"
  document.getElementsByClassName("black")[0].classList.add("white")
  document.getElementsByClassName("white")[0].classList.value = "waves-effect waves-black btn black white"
}
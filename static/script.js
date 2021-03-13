const rick = "location"
const lS = localStorage

function create() {
  let args = document.getElementById('wip').value
  let argz = document.getElementById('wip1').value
  let arg = document.getElementById('wip2').value
  let category = document.getElementById('wip3').value
  if (args.startsWith(" ") || !args) return M.toast({html: "Item name required. (make sure you don't include spaces at the start)", classes: "red"})
  if (args.includes(rick) || argz.includes(rick) || arg.includes(rick) || category.includes(rick)) return M.toast({html: "location is blocked to prevent rickrolls", classes: "red"})
  if (argz.includes(" ") || !argz) argz = "anonymous"
  if (arg.includes(" ") || !arg) arg = "No description set"
  if (category.includes(" ") || !category) category = "No category set"
  let xhr = new XMLHttpRequest()
  xhr.open("POST", "/create?item=" + args + "&user=" + argz + "&description=" + arg + "&category=" + category)
  xhr.send()
  document.getElementById('wip').value = ""
  document.getElementById('wip1').value = ""
  document.getElementById('wip2').value = ""
  document.getElementById('wip3').value = ""
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
  let args = document.getElementById('wip4').value
  let argz = document.getElementById('wip5').value
  if (args.startsWith(" ") || !args) return M.toast({html: "Name required.", classes: "red"})
  if (argz.startsWith(" ") || !argz) {
    if (confirm("You are at risk of not having a password. Are you sure that you want to continue now?")) createNow()
    return;
  }
  createNow()
  function createNow() {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/createAdminAccount?name=" + args + "&password=" + argz)
    xhr.send()
    document.getElementById('wip4').value = ""
    document.getElementById('wip5').value = ""
    M.toast({html: 'Created!', classes: "green"})
  }
}

if (lS.dark) {
  document.body.style.backgroundColor = "#111212"
  document.body.style.color = "white"
  document.getElementsByClassName("items")[0].style.color = "black"
  document.getElementsByClassName("news-ticker")[0].style.backgroundColor = "white"
  document.getElementsByClassName("news-ticker")[0].style.color = "black"
  document.getElementsByClassName("black")[0].style.color = "black"
  document.getElementsByClassName("black")[0].classList.add("white")
  document.getElementsByClassName("white")[0].classList.value = "waves-effect waves-black btn black white"
}
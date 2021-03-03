const specialkeys = ["Shift", "Backspace"]
let dir = "/home/runner/NyokoSatouhItems/terminal/>"

document.getElementById('terminal').innerHTML = dir

document.onkeydown = e => {
  if (e.key == "Enter") return document.getElementById('terminal').innerHTML += "<br>" + dir;
  for (i = 0; i < specialkeys.length; i++) {
    if (e.key.includes(specialkeys, i)) return;
  }
  document.getElementById('terminal').innerHTML += e.key
}
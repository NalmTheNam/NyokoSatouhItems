const express = require("express")
const app = express();
const fs = require("fs");
const takendown = false;
const ach = require("./ach.json")
// let i = 0
function checkAch(c = false) {
  if (c) return ach.completed.join("<br>")
  else return ach.incomplete.join("<br>")
} 
var uuid = require("./uuid.js").uuid;
let password = "K3SH-7HHC-2YK3-EFPM-N2US-9M5D-HLTB";
let items = []
let deleteditems = [];
let recentUser = "";
items = JSON.parse(fs.readFileSync("./save/savefle.json"));
deleteditems = JSON.parse(fs.readFileSync("./save/savefle2.json"));
recentUser = JSON.parse(fs.readFileSync("./save/savefle3.json"));
const news = ["There is a total of " + items.length + " items", "Recent name maked an item is " + recentUser]
let randomizeNews = Math.floor(Math.random() * news.length)
let newsThing = news[randomizeNews]
setInterval(() => {
  randomizeNews = Math.floor(Math.random() * news.length)
  newsThing = news[randomizeNews]
}, 15000)

app.enable('trust proxy')

app.enable('case sensitive routing')

app.use(express.static("./static"))

app.get("/", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.send("<!DOCTYPE html><title>NamItems</title><link href='style.css' rel='stylesheet'><div class='news-tcontainer'><div class='news-ticker'><div class='news-ticker-wrap'><div class='news-ticker-move'>BREAKING NEWS: " + newsThing + "</div></div></div></div><br><div class='items'><h1>Items</h1></div><br>" + items.join("<br>") + "<br><br><button onclick=\"location.href = '/createItem'\">Create an item</button><br><br><button onclick=\"location.href = '/admin'\">Admin Login</button><br><br><button onclick=\"location.href = '/achievements'\">Achievements</button><br><br><nav><br><a href='/about'>About</a> <a href='/changelogs'>Changelogs</a><br><br></nav><br>Current Version: v2.01")
})

app.get("/about", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.sendFile(__dirname + "/about.html")
})

app.get("/changelogs", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.sendFile(__dirname + "/changelogs.html")
})

app.get("/create", (req, res) => {
  items.push(req.query.user + " made " + req.query.item)
  recentUser = req.query.user
})

app.get("/createItem", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.sendFile(__dirname + "/create.html")
});

app.get("/achievements", (req, res) => {
  res.send("<!DOCTYPE html><title>NamItems Achievements</title><link href='style.css' rel='stylesheet'><div class='items'><h1>Achievements</h1></div><h3>Completed</h3>" + checkAch(true) + "<h3>Incomplete</h3>" + checkAch())
})

app.get("/admin", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.sendFile(__dirname + "/login.html")
})

app.get("/didLogin", (req, res) => {
  if (takendown) return res.status(429).sendFile(__dirname + "/down.html")
  if (req.query.password == undefined || req.query.password == "") return res.status(403).sendFile(__dirname + "/empty.html");
  uuid(req.query.password) == "K3SH-7HHC-2YK3-EFPM-N2US-9M5D-HLTB" ? res.send("<!DOCTYPE html><title>NamItems as Admin</title><link href='style.css' rel='stylesheet'><div class='news-tcontainer'><div class='news-ticker'><div class='news-ticker-wrap'><div class='news-ticker-move'>BREAKING NEWS: " + news[randomizeNews] + "</div></div></div></div><br><div class='items'><h1>Items</h1></div><br>" + items.join("<br>") + "<br><br><button onclick=\"location.replace('/createItem')\">Create an item</button><br><br><button onclick=\"location.replace('/deleteItem?direction=last&password='+location.search.replace('?password=',''))\">Delete last item</button><br><br><button onclick=\"location.replace('/deleteItem?direction=first&password='+location.search.replace('?password=',''))\">Delete first item</button><br><br><button onclick=\"location.replace('/deleteItem?direction=all&password='+location.search.replace('?password=',''))\">Delete all items</button><br><br><button onclick=\"location.href = '/deletedItems'\">Show deleted items</button><br><br><button onclick=\"location.href = '/achievements'\">Achievements</button><br><br><nav><br><a href='/about'>About</a> <a href='/changelogs'>Changelogs</a><br><br></nav><br>Current Version: v2.01") : res.status(403).sendFile(__dirname + "/wrong.html");
})

app.get("/deleteItem", (req, res) => {
  if (req.query.password == undefined || req.query.password == "") {
    res.status(403).send("Access denied");
    return;
  }
  if (uuid(req.query.password) == password) {
    if (req.query.direction == "last") {
      deleteditems.push(items.pop())
      res.redirect("/didLogin?password=" + req.query.password)
    } else if (req.query.direction == "first") {
      deleteditems.push(items.shift())
      res.redirect("/didLogin?password=" + req.query.password);
    } else if (req.query.direction == "all") {
      while (items.length) {
        deleteditems.push(items.pop())
      }
      if (!items.length) res.redirect("/didLogin?password=" + req.query.password);
    }
  } else {
    res.status(403).send("Access denied");
  }
})

app.get("/deletedItems", (req, res) => {
  takendown ? res.status(429).sendFile(__dirname + "/down.html") : res.send("<!DOCTYPE html><title>Deleted items</title><link href='style.css' rel='stylesheet'><div class='items'><h1>Deleted items </h1></div><h2>These are non-items. Take care of it.</h2>" + deleteditems.join("<br>") + "<br><br><button onclick=\"history.back();\">Go back</button><div class='danger'><h2>DANGER ZONE</h2><button onclick=\"location.replace('/deletePermamently?direction=last')\">Delete last item permamently</button><br><br><button onclick=\"location.replace('/deletePermamently?direction=first')\">Delete first item permamently</button><br><br><button onclick=\"location.replace('/deletePermamently?direction=all')\">Delete all items permamently</button></div>");
})

app.get("/deletePermamently", (req, res) => {
  if (req.query.direction == "last") {
    deleteditems.pop()
    res.redirect("/deletedItems")
  } else if (req.query.direction == "first") {
    deleteditems.shift()
    res.redirect("/deletedItems")
  } else if (req.query.direction == "all") {
    deleteditems = []
    res.redirect("/deletedItems")
  }
})

app.use((req, res) => {
	res.status(404).sendFile(__dirname + '/notfound.html');
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).sendFile(__dirname + "/err.html")
})

app.listen(3000, () => {
  console.log("Listening...")
})

setInterval(() => {
  fs.writeFileSync("./save/savefle.json", JSON.stringify(items));
  fs.writeFileSync("./save/savefle2.json", JSON.stringify(deleteditems));
  fs.writeFileSync("./save/savefle3.json", JSON.stringify(recentUser));
}, 5000)

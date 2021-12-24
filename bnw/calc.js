const express = require("express");
const { path } = require("express/lib/application");
const app = express();

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
	// __dirname path.js참조
});
app.listen(3000, function () {
	console.log("Server running at port 3000");
});

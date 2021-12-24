const express = require(express);
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	// res.send("<h1>Hello World!</h1>");
	res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});

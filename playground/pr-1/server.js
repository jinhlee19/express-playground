const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send('API Running');
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log(`Server Started on port ${port}`);
});

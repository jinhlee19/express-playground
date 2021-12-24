const express = require("express");
const app = express();

app.get("/", function(req, res){
    // console.log(req);
    res.send("<h1>Hello, World!</h1>");
});
// app.get() -> what should happen when our browser gets in touch with our server and makes a get request.
// get(로컬 서버에 도착 시 get request is being sent to the route of our web site(location "/"), what should happen when you get it)

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
// callback function that can give sign when server is running
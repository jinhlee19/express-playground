const express = require('express');
const app = express();

// Connect DB
const connectDB = require('./config/db');
connectDB();

app.get('/', (req,res)=>{
    res.send('Api running!');
});
const PORT = process.env.PORT || 5003;
app.listen(PORT, ()=>{
    console.log(`server started on PORT ${PORT}`)
});

/*
process.env는 heroku등에서 사용하기 위해서 
dotenv 파일을 만들어서 mongoose 접속을 위한 계정, 비번을 넣어줄 수도 있다. 
*/
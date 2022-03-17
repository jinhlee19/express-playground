const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

// Connect DB

// Q) 이때, app.get 과 app.use의 차이?
app.get('/', (req,res)=>{
    res.send('Api running!');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5003;
app.listen(PORT, ()=>{
    console.log(`server started on PORT ${PORT}`)
});

/*
process.env는 heroku등에서 사용하기 위해서 
dotenv 파일을 만들어서 mongoose 접속을 위한 계정, 비번을 넣어줄 수도 있다. 
*/
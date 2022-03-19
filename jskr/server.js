const express = require('express');
const app = express();
// Connect DB
const connectDB = require('./config/db');
connectDB();

// Init Middleware - bodyparser
app.use(express.json({ extended: false }));

// Q) 이때, app.get 과 app.use의 차이?
app.get('/', (req, res) => {
	res.send('Api running!');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
	console.log(`server started on PORT ${PORT}`);
});

/*
19열)
this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.
세팅된 환경변수에 따라서 포트 변경시켜주기. 환경이 없을때 || (or) 5000포트에 배치
--- 
process.env는 heroku등에서 사용하기 위해서 
dotenv 파일을 만들어서 mongoose 접속을 위한 계정, 비번을 넣어줄 수도 있다. 
*/

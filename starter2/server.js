const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
// this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.
// 세팅된 환경변수에 따라서 포트 변경시켜주기. 환경이 없을때 || (or) 5000포트에 배치
app.listen(PORT, () => console.log('Server started on port ${PORT}'));

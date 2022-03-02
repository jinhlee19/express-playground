# Note

### 1.

```shell
npm init
```

### 2.

```shell
npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
```

### 3.

```shell
npm i -D nodemon concurrently
```

### 4.

this will look for an environment variable called port to use and when we deploy to hiroku, that's where its going to get the port.

> 세팅된 환경변수에 따라서 포트 변경시켜주기. 환경이 없을때 || (or) 5000포트에 배치

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));
```

node server는 heroku에 배포할때 필요
server: nodemon server는 서버를 재시작할 필요 없이 server라는 파일,
이후에 리액트를 실행하는 클라이언트 스크립트, concurrent dev 스크립트를 추가 할 예정

```json
"scripts": {
  "start": "node server",
  "server": "nodemon server"
},
```

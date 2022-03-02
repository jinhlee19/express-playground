# Step 1

npm i
npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
npm i -D nodemon concurrently

# Step 2

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));
```

# Step 2-1

node server는 heroku에 배포할때 필요
server: nodemon server는 서버를 재시작할 필요 없이 server라는 파일,
이후에 리액트를 실행하는 클라이언트 스크립트, concurrent dev 스크립트를 추가 할 예정

```json
"scripts": {
  "start": "node server",
  "server": "nodemon server"
},
```

# Step 2.2.

Postman에서 get request 넣기
get request to port 5000

# Step 3

config/default.json

> add to gitignore

```
**/default.json
```

```javascript
const mongoose = require('mongoose');
const config = require('config');
const { use } = require('../routes/api/users');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, { useNewUrlParser: true });
		console.log('MongoDB Connected...');
	} catch (err) {
		console.log(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
console.log(db);
module.exports = connectDB;
```

참고:

### 수동 프로세스 종료 process.exit(1)

> Node.js 의 process.exit() 메소드는 Node.js 프로세스를 즉시 중지하고 종료하는 데 사용됩니다. 이는 언제라도 어떤 방법 으로든 발생할 수 있으므로 오류가 발생하면 Node.js 응용 프로그램을 완전히 중지시킬 수 있으므로 위험한 작업입니다.

### Nodejs 프로세스를 종료시키는 방법

- Uncaught exception: throw new Error()
- Unhandled promise rejection: Promise.reject()
- error event 무시: EventEmitter#emit('error')
- Unhandled Signals: $ kill <PROCESS_ID>

# Step 3.1.

@ server.js

```javascript
const connectDB = require('./config/db');

// Connect DB
connectDB();
```

# Step 4 - Router

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String        
    },
    date: {
        type: String,
        require: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);


/* 
REGISTER 할 수 있도록 model 만들기
모델 만들기 위해서 스키마를 먼저 만들어준다.
*/
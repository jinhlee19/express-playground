const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    // 이때 모든 프로파일은 유저와 연결되므로 user model로 향하는 레퍼런스를 만들어줘야한다. 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //  Q) 이걸 출력해서 볼수 있을까?
        ref: 'user'
    },
    
});
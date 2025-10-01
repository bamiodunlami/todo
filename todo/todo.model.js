const { type } = require('os');
const path = require('path');
const db = require(path.join(__dirname, '..', 'config', 'db'));


const todoId = ()=>{
    const random = Math.floor(Math.random() * 1000)
    const suffix = Date.now();
    return `${random}${suffix}`;
}

const todoSchema = new db.Schema({
    todo_id:{
        type:String,
        default: todoId
    },
    title:{
        type: String,
        required: true,
        minLenghth: 3,
        maxLength: 50
    },
    description:{
        type: String,
        required: true,
        minLenghth: 3,
        maxLength: 200
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    userId:{
        type: String,
        required: true,
    }

})

module.exports = new db.model('Todo', todoSchema);
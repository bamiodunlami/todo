const path = require('path');
const db = require(path.join(__dirname, '..', 'config', 'db'));
const passportLocalMongoose = require('passport-local-mongoose');

const userId = ()=>{
    const random = Math.floor(Math.random() * 1000)
    const suffix = Date.now();
    return `${random}${suffix}`;
}
const userSchema = new db.Schema({
    id: { type: String, required: true, default: userId },
    username: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    created_at: { type: Date, default: Date.now}
})


userSchema.plugin(passportLocalMongoose);

module.exports = new db.model('User', userSchema);

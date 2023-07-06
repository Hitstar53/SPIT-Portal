const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    emailID: {type: String, required: true, unique: true},
    role: {type: String, required: true}
},
{collection: 'Users'});

module.exports = mongoose.model('users', userSchema);
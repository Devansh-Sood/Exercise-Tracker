const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
},
{
    timestamps:true,        //automatically create field for when it was created or when it was modified
}
);

const User = mongoose.model('User',userSchema);

module.exports = User;
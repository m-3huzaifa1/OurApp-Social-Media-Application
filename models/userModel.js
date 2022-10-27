const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    privateAccount: {
        type: Boolean,
        required: true,
        default: false
    },
    followers: [{type: Schema.Types.ObjectId,req : 'users'}],
    following: [{type: Schema.Types.ObjectId,req : 'users'}],
    profilePicUrl: {
        type: String ,
        required:false,
        default: ''
    },
    bio: {
        type: String, 
        required: false, 
        default: ''
    },
    savedPosts:[],
    archivedPosts: []
},
{
    timestamps: true,
})

module.exports=mongoose.model("users",userSchema);
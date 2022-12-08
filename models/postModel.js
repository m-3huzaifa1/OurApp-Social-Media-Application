const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const postSchema= new Schema({
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    },
    /*video: {
        type: String
    },*/
    comments: [{
        user: {type: Schema.Types.ObjectID, ref: 'users'},
        date: {type: String, required: true}, 
        comment: {type: String,required: true}
    }],
    likes: [{
        user: {type: Schema.Types.ObjectID, ref: 'users'},
        date: {type: String, required: true}, 
    }],
    user: { type: Schema.Types.ObjectId, ref: 'users' },
},{
    timestamps: true,
});

module.exports= mongoose.model('posts',postSchema);
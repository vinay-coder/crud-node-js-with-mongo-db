const mongoose=require('mongoose');

const post_schema = mongoose.Schema({
    title : String,
    content : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Post' , post_schema);
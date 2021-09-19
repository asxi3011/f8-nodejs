const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const course = new Schema({
    name: {type:String,maxLength:255},
    videoId: {type:String },
    image:{type:String },
    slug:{type:String},
    description:{type:String},
},{
    timestamps:true,
})
course.plugin(mongoose_delete, { deletedAt : true , overrideMethods: 'all' });
module.exports = mongoose.model('course',course);
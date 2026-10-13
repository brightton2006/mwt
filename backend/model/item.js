const mongoose=require('mongoose');
const studentSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,'student name is required'],
        trim: true,
    },
    email: {
        type:String,
        required:[true,'student email is required'],
        trim: true,
    },
    age:{
        type:Number,
        required:[true,'student age is required'],
        min: [1,'age is required'],
    },
},
    {
        timestamp:true,
    }
);
module.exports=mongoose.model('student',studentSchema);
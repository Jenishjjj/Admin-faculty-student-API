const mongoose = require('mongoose');

const FacultySchema = mongoose.Schema({
    faculty_name :{
        type : String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    student_id:{
        type:Array,
        ref:'StudentD',
        require:true
    }
})

const faculty = mongoose.model('faculty',FacultySchema);
module.exports=faculty;

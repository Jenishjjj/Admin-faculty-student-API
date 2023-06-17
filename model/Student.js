const mongoose = require('mongoose');

const singleImagePath = '/singleimage';
const multiImagePath = '/multiimage';

const path = require('path');

const multer = require('multer')

const StudentSchema = mongoose.Schema({
    username :{
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
    gender:{
        type:String,
        require:true
    },
    hobby:{
        type:Array,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    multiimage:{
        type:Array,
        require:true
    }
});

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        if(file.fieldname=='image'){
            cb(null,path.join(__dirname,"..",singleImagePath))
        }
        else{
            cb(null,path.join(__dirname,"..",multiImagePath))
        }
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }

})


StudentSchema.statics.uploadedAvtar = multer({storage:storage}).fields([{name:'image',maxCount:1},{name:'multiimage',maxCount:5}]);
StudentSchema.statics.singleImagePath = singleImagePath;
StudentSchema.statics.multiImagePath = multiImagePath;


const Student = mongoose.model('Student',StudentSchema);
module.exports=Student;

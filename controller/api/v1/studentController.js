const Student  = require('../../../model/StudentD');
const Faculty = require('../../../model/Faculty');

module.exports.stud_register = async (req,res)=>{
    req.body.role = 'Student';
    let studData = await Student.create(req.body)
    let facdata = await Faculty.findById(studData.faculty_id); 
    await facdata.student_id.push(studData.id);
    await Faculty.findByIdAndUpdate(studData.faculty_id,{student_id:facdata.student_id});
    if(studData){
        return res.json({status:200,msg:"student data added successfully"});
    }
    else{
        return res.json({status:500,msg:'something wrong'});
    }
}
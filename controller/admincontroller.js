const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const Student = require('../model/Student')

module.exports.register = async (req,res)=>{
    req.body.role = "Admin";
    let checkData = await Admin.findOne({email:req.body.email});
    if(checkData){
        return res.json({'status':400,'msg':"data is added already"});
    }
    else{
        await Admin.create(req.body);
        return res.json({'status':200,'msg':"data added"});
    }
}

module.exports.getData = async (req,res)=>{
    return res.redirect('/getAdmindata');
}

module.exports.getAdmindata = async (req,res)=>{
    let data = await Admin.find({});
    if(data){
        return res.json({status:200,'data':data});
    }
    else{
        return res.json({status:500,msg:'something wrong'});
    }   
}


module.exports.deleteData = async (req,res)=>{
    let data = await Admin.findById(req.params.id);
    if(data){
        let delData = await Admin.findByIdAndDelete(req.params.id);
        if(delData){
            return res.json({'status':200,'msg':'data deleted'});
        }
        else{
            return res.json({'status':400,'msg':'something wrong'});
        }
    }
    else{
        return res.json({'status':400,'msg':'something wrong'});
    }
}

module.exports.updateData = async (req,res)=>{
    let data = await Admin.findById(req.params.id);
    if(data){
        let upData = await Admin.findByIdAndUpdate(req.params.id,req.body);
        if(upData){
            return res.json({'status':200,'msg':'data updated successfully'});
        }
        else{
            return res.json({'status':400,'msg':'something wrong'});
        }
    }
    else{
        return res.json({'status':400,'msg':'something wrong'});
    }
}

module.exports.Admin = async (req,res)=>{
    let checkemail = await Admin.findOne({email:req.body.email});
    if(checkemail){
        if(checkemail.password == req.body.password){
            let token = jwt.sign({data:checkemail},"jj",{expiresIn:85200});
            return res.json({'status':200,'msg':token});
        }
        else{
            return res.json({"status":500,"msg":"invalid enterd data"});
        }
    }
    else{
        return res.json({"status":500,"msg":"data not available"});
    }
}

module.exports.add_fields = async (req,res)=>{
    var singleimage = '';
    if (req.files.image) {
        singleimage = Student.singleImagePath + '/' + req.files.image[0].filename;
    }
    req.body.image = singleimage;

    var multiimage = [];
    if (req.files.multiimage) {
        for (var i = 0; i < req.files.multiimage.length; i++) {
            multiimage.push(Student.multiImagePath + '/' + req.files.multiimage[i].filename)
        }
    }

    req.body.multiimage = multiimage;

    let data = await Student.create(req.body);
    if (data) {
        return res.json({ status: 200, msg: 'Data added successfully' });
    } else {
        return res.json({ status: 400, msg: '!!! Add All information ' });
    }
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.json({status:500,msg:err})
        }
        else{
            return res.json({status:200,msg:"logout successfully"})
        }
    })
}

module.exports.adminProfile = async (req,res)=>{
    return res.json({status:200,msg:req.user});   
}
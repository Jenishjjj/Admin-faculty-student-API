const faculty = require('../../../../model/Faculty');
const jwt = require('jsonwebtoken');

module.exports.register = async (req,res)=>{
    req.body.role = "Faculty";
    let checkdata = await faculty.findOne({email:req.body.email});
    if(checkdata){
        return res.json({status:400,msg:"Email alredy exists"})
    }
    else{
        await faculty.create(req.body);
        return res.json({status:200,msg:"Data added successfully"});
    }
}

module.exports.login = async (req,res)=>{
    let data = await faculty.findOne({email:req.body.email});
    if(data){
        if(data.password == req.body.password){
            let token = jwt.sign({data:data},'jj',{expiresIn:85200});
            return res.json({status:200,msg:"token genreted",'token':token});
        }
        else{
            return res.json({status:400,msg:'Invalid entered data'});
        }
    }
    else{
        return res.json({status:400,msg:'data not available'});
    }
}

module.exports.profile = async (req,res)=>{
   return res.redirect('/faculty/myprofile');
}
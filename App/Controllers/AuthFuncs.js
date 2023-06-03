const {collection1}=require('../Collections/collection1');
const jwt=require('jsonwebtoken');
const secret_key='asdfghjkl';




module.exports.getSigned= async function getSigned(req,res){
    res.sendFile('C:/Users/paria/Desktop/Thaparpedia 2/App/Public/Signup.html');
}






module.exports.Signup= async function Signup(req,res){
    try{
        let data=req.body;
        let user=await collection1.create(data);
        
        console.log(data);
            
        res.json({
            message:"User signed up",
            data:data                       
        });
        
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}





module.exports.getlogin= async function getlogin(req,res){
    res.sendFile('C:/Users/paria/Desktop/Thaparpedia 2/App/Public/Login.html');
}







module.exports.login= async function login(req,res){
    try{
        let data=req.body;
        const user=await collection1.findOne({Email:data.Email});
        if(user){
            if(user.Password===data.Password){
                
                const uuid=user._id;
                const token=jwt.sign({payload:uuid},secret_key);
                res.cookie('isLoggedIn',token,{
                    maxAge:1000*60*60*24
                });
                
                return res.json({
                    message:"User LoggedIn Successfully",
                    UserDetails:user
                }) 
            }
            else{
                return res.json({
                    message:'Incorrect Password'
                });
            }
        }
        else{
            return res.json({
                message:'User does not exist'
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message
        });
    }
}








module.exports.logout=async function logout(req,res){
    res.clearCookie('isLoggedIn');
    return res.json({
        message:'User Logged Out'
    });
}
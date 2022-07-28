const userSchema = require('../model/user.model'); 
const httpService = require('../services/http-errors.service');
const tokenService = require('../services/token.service');
const IsEmail = require('isemail'); 
const bcrypt = require('bcrypt'); 
const router = require('../routes/route'); 


const userRegister = async (req, res)=>{
    try {
        const data = req.body; 
        const dataRes = await userSchema.create(data);  // create a new filed
        return res.status(201).send({
            status: true,
            message: 'Data inserted successfully !',
            data: dataRes
        }); 
    } catch (error) {
        httpService.handleError(res, error); // handle error from http-errors-service file.
    }
}

const login = async (req, res)=>{
    try {
        const { email, password } = req.body; 
       
        if(!email || !password){
            return res.status(400).send({
                status: false,
                message: 'Email and Pasword both are compulsary !' 
            }); 
        }
        if(!IsEmail.validate(email)){
            return res.status(400).send({
                status: false,
                message: `${email} is not a valid Email Id !`
            });
        }
        const emailRes = await userSchema.findOne({email: email});  
       
        if(!emailRes){
            return res.status(404).send({
                status: false,
                message: 'Invalid username and password !' //wrong email
            }); 
        }
        bcrypt.compare(password, emailRes.password).then((result)=>{// here using for matching password and email
         
            if(!result){
                return res.status(404).send({
                    status: false,
                    message: 'Invalid username and password !' //wrong password
                }); 
            }
            const token = tokenService.createToken(emailRes._id); 
            return res.status(200).send({
                status: true,
                message: token
            });
        }).catch((error)=>{
            return res.status(500).send({
                status: false,
                message: error.message
            }); 
        }); 
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        }); 
    }
}

const logout = async (req, res)=>{
    try {
        token = undefined;
        return res.status(200).send({
            status: true,
            message: 'Logout  successfully !',
           
        }); 
    } catch (error) {
        httpService.handleError(res, error); // handle error from http-errors-service file.
    }
}

const forgetPassword = async(req,res)=>{
const {email} = req.body;
userSchema.findOne({email},(err,user)=>{
    if(err || !user){
        return res.status(400).json({error: "User Email Not exits"})
    }
    const token = jwt.sign({_id:user._id},dlnr4MU44gvXNxvhmyeeV9b6huF4qjFaaa, {expiresIn:'20m'});
    const data={
        from :'noreply@hello.com',
        to:email,
        subject:"Account Activation Link",
        html:`<h2>click,Reset your password</h2>
        <p>resetpassword/${token}</p>`
    }
})
}



module.exports = {
    userRegister,
    login,
    logout,
    forgetPassword
}


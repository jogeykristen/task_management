const sequelize = require('../config/database');
const bcrypt = require('bcrypt');


module.exports.createUser = async(req,res)=>{
    try{
        console.log("hi")
        const{name,email,phonenumber,role, password}=req.body;
        console.log("email = ",req.body.email);
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        regex = /^\d{10}$/;
        if(emailFormat.test(req.body.email)){
            if(regex.test(req.body.phonenumber)){
                const check = await sequelize.query(`Select * from public."User" Where email = :email`,{
                    replacements:{email},
                    type:sequelize.QueryTypes.SELECT,  
                })
                if(check.length !==0){
                    return res.status(401).json({message:"email already exists"})
                }
                const salt = await bcrypt.genSalt(10);

                // Hash the password using the generated salt
                const hashedPassword = await bcrypt.hash(password, salt);
                const query = `INSERT INTO public."User"(name, email, phonenumber, role,password) VALUES (:name, :email, :phonenumber, :role, :hashedPassword) RETURNING *`;

                const [user] = await sequelize.query(query, {
        
                replacements:{name,email,phonenumber,role,hashedPassword},//replacements is an array containing the actual values that will replace the placeholders in the query. The values are taken from the variables
                type:sequelize.QueryTypes.INSERT, 
            });
            res.status(201).json({ user });
            }
            return res.status(404).json({message:"Enter an valid 10 digit number"})
        }
        return res.status(404).json({message:"Enter an valid email address"})
        
    }catch(error){
        console.log("Error = ",error)
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports.Login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await sequelize.query(`Select * from public."User" where email = :email`,{
        
            replacements:{email},
            type:sequelize.QueryTypes.SELECT, 
        });
        //console.log("user = ",user)
        if(user.length===0){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const storedPassword = user[0].password
        const validPassword = await bcrypt.compare(password,storedPassword);
        if(!validPassword){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    }catch(error){
        console.log("Error = ",error)
        return res.status(500).json({ error: "Server error" });
    }
}
import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { List } from "../models/list";
import { TranslateCheck } from "../models/traslatecheck";

export const newUser = async (req:Request, res:Response) =>{

    const {userName , password, role} = req.body

    try {
        if(!userName) return res.status(400).send('Name can not be null')
        if(!password) return res.status(400).send('Password can not be null')
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser =await User.create({...req.body, password: hashedPassword});
            return res.status(201).send(newUser);
        }

    } catch (error:any) {
        console.log(error.message)
        return res.status(400).send("Name already exist.");
    }

}

export const loginUser = async (req:Request, res:Response) =>{
    const {userName, password} = req.body;

    
    try {
    //Validate if user exist
        const user = await User.findOne({
            where:{
                userName
            }
        })
        if (!user){
            return res.status(400).json({msg: `Username ${userName} not exist in our database`})
        }

    //Validate password
        const passwordOk = await bcrypt.compare(password, user.password)
        if(!passwordOk) return res.status(400).json({msg:"invalid password"})

    //Generate token
    const token = jwt.sign({
        userName,
        role: user.role
    }, process.env.SECRET_KEY || "pepito flores")

    return res.status(200).json({token})

    } catch (error:any) {
        console.log(error.message)
        return res.status(500).send('Server not responding')
    }

}

export const testName = async (req:Request, res:Response) =>{
    const {userName} = req.body;

    try {
        const checkNameAviability = await User.findOne({
            where:{
                userName
            }
        })
        if (checkNameAviability){
            return res.status(400).json({aviable:false, msg: "Username not aviable"})
        }
        else return res.status(200).json({aviable:true, msg: "Username aviable"})
    } catch (error:any) {
        console.log(error.message)
        return res.status(500).send('Server not responding')
    }

}

export const getUserList = async  (req:Request,res:Response)=>{
    const headerToken = req.headers['authorization']
    
    if (headerToken !== undefined){
        const bearerToken = headerToken.slice(7);
        const roleCheck:any  = jwt.decode(bearerToken)
        if(roleCheck.role === "admin"){
            try {  
                const userList  = await User.findAll({include : [{
                    model:List,
                    attributes: ["title"]
                },
                {
                    model: TranslateCheck,
                    attributes:["translatedFlag"]
                }
                ]});
                if (userList.length !== 0){
                    return res.status(200).send(userList)
                }
                else return res.status(404).json({msg:"Theres no user in database"})
            } catch (error:any) {
                console.log(error.message)
                return res.status(500).send("server goes wrong")
            }
        }

        else return res.status(404).json({msg:"unhautorized"})
    }
    else return res.status(404).send("Token invalid")
}


export const translateUpdate = async (req:Request, res:Response)=>{
    const {userName} = req.body

    try {
        
        const user = await User.findOne({
            where : {
                userName
            }
        });
        if(user){
            await TranslateCheck.update({translatedFlag : true},{
                where : {
                    userId : user.id
                }
            })
        }

    } catch (error) {
        
    }
}
import { Request, Response } from "express"
import { List } from "../models/list"
import { User } from "../models/user"
import jwt from "jsonwebtoken"

export const getList = async (req:Request, res:Response)=>{

    const headerToken = req.headers['authorization']

    try {
        if (headerToken !== undefined){
            const bearerToken = headerToken.slice(7);
            const userInfo:any  = jwt.decode(bearerToken)
            const findUser = await User.findByPk(userInfo.userId)
            if (!findUser) return res.status(404).send('userId not exist in our database')
            const getUserList = await List.findAll({
                where:{
                    userId :userInfo.userId
                },
                order: ['createdAt']
            })
            return res.status(200).send(getUserList)
        }
        else{
            return res.status(400).json({msg : 'Header authorization is missing'})
        }
        
    } catch (error:any) {
        console.log(error.message)
        return res.status(404).send('userId its not a valid Id')
    }

}

export const postTask = async (req:Request, res:Response)=>{
    const {title} = req.body
    const headerToken = req.headers['authorization'] 

    try {
            if(!title) return res.status(400).send('Content cant be empty')
            if(headerToken){
            const bearerToken = headerToken.slice(7);
            const userInfo:any  = jwt.decode(bearerToken)
            const newTask = await List.create({title,userId:userInfo.userId})
            return res.status(200).send(newTask)
            }
        else{
            return res.status(401).send('Unhautorized')
        }
    } catch (error:any) {
        console.log(error.message)
        return res.status(400).send('Task not created')
    }
}

export const updateTask = async (req:Request, res:Response)=>{
    const { id, show } = req.body

    try {
        await List.update({show}, {
            where:{
                id
            }
        })
        return res.status(200).json({show,id})

    } catch (error:any) {
        console.log(error.message)
        return res.status(400).send('Task not moddified')
    }

}

export const deleteTask = async (req:Request, res:Response)=>{
    const { id } = req.body

    try {
        let sayGoodBye = await List.findByPk(id);
        await sayGoodBye.destroy();
        return res.status(200).send('Task deleted succesfull');

    } catch (error:any) {
        console.log(error.message)
        return res.status(400).send('Task not longer exist')
    }

}

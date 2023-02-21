import { Request, Response } from "express"
import { List } from "../models/list"
import { User } from "../models/user"

export const getList = async (req:Request, res:Response)=>{

    const {userId} = req.body
    try {
        if (!userId) return res.status(400).send('userId cant be empty')
        else{
            const findUser = await User.findByPk(userId)
            if (!findUser) return res.status(404).send('userId not exist in our database')
            const getUserList = await List.findAll({where:{userId}})
            return res.status(200).send(getUserList)
        }
        
    } catch (error:any) {
        console.log(error.message)
        return res.status(404).send('userId its not a valid Id')
    }

}

export const postTask = async (req:Request, res:Response)=>{
    const {title, userId} = req.body

    try {
        if(!title) return res.status(400).send('Content cant be empty')
        if(!userId) return res.status(400).send('Need send User Id')
        else{
            const newTask = await List.create(req.body)
            return res.status(200).send(newTask)
        }
    } catch (error:any) {
        console.log(error.message)
        return res.status(400).send('Task not created')
    }

}

export const updateTask = async (req:Request, res:Response)=>{
    const { id, title } = req.body

    try {
        if(!title) return res.status(400).send('Content cant be empty')
        await List.update({title}, {
            where:{
                id
            }
        })
        return res.status(200).json({title,id})

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

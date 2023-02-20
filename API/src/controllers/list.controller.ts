import { Request, Response } from "express"

export const getList = (req:Request, res:Response)=>{

    res.json({
        msg: "Get List"
    })

}
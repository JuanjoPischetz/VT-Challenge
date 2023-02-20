import express from 'express';
import sequelize from '../db/connection';
import routesList from '../routes/list';
import routesUser from '../routes/user';
import { User } from './user';
import { List } from './list';

class Server{
    private app: express.Application;
    private port: string;
    
    constructor(){
        this.app=express();
        this.port= process.env.PORT || '3001'
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Listen on ' + this.port)
        })
    }

    routes(){
        this.app.use('/api/list', routesList)
        this.app.use('/api/users', routesUser)
    }

    middlewares(){
        this.app.use(express.json())
    }

    async dbConnect (){
        try {
            User.hasMany(List);
            List.belongsTo(User);
            await sequelize.sync({force: true})
            console.log('Successfull')
        } catch (error) {
            console.log(error)
        }
    }
}

export default Server
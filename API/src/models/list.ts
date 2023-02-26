import sequelize from "../db/connection";
import { DataTypes} from "sequelize"

export const List = sequelize.define('list', {

    title :{
        type: DataTypes.TEXT,
        allowNull:false
    },
    
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,

    },

    show : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})


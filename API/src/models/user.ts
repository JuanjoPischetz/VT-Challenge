import sequelize from "../db/connection";
import { DataTypes }  from "sequelize";

export const User = sequelize.define('user',{

    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },

    userName : {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user"
    }
},
{
    timestamps : false
}

)

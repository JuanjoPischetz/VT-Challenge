import sequelize from "../db/connection";
import { DataTypes} from "sequelize"


export const TranslateCheck = sequelize.define('translateCheck',{

    translatedFlag : {
        type: DataTypes.BOOLEAN,
        defaultValue : false
    }

})
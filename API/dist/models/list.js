"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.List = connection_1.default.define('list', {
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    show: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, { timeStamp: false });

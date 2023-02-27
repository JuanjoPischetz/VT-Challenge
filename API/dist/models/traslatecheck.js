"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateCheck = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.TranslateCheck = connection_1.default.define('translateCheck', {
    translatedFlag: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
});

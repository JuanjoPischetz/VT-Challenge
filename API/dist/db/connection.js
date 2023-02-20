"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dtchallenge`, {
    logging: false,
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
exports.default = sequelize;

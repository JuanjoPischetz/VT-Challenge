"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.postTask = exports.getList = void 0;
const list_1 = require("../models/list");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.headers['authorization'];
    try {
        if (headerToken !== undefined) {
            const bearerToken = headerToken.slice(7);
            const userInfo = jsonwebtoken_1.default.decode(bearerToken);
            const findUser = yield user_1.User.findByPk(userInfo.userId);
            if (!findUser)
                return res.status(404).send('userId not exist in our database');
            const getUserList = yield list_1.List.findAll({ where: { userId: userInfo.userId } });
            return res.status(200).send(getUserList);
        }
        else {
            return res.status(400).json({ msg: 'Header authorization is missing' });
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(404).send('userId its not a valid Id');
    }
});
exports.getList = getList;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, userId } = req.body;
    try {
        if (!title)
            return res.status(400).send('Content cant be empty');
        if (!userId)
            return res.status(400).send('Need send User Id');
        else {
            const newTask = yield list_1.List.create(req.body);
            return res.status(200).send(newTask);
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send('Task not created');
    }
});
exports.postTask = postTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title } = req.body;
    try {
        if (!title)
            return res.status(400).send('Content cant be empty');
        yield list_1.List.update({ title }, {
            where: {
                id
            }
        });
        return res.status(200).json({ title, id });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send('Task not moddified');
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        let sayGoodBye = yield list_1.List.findByPk(id);
        yield sayGoodBye.destroy();
        return res.status(200).send('Task deleted succesfull');
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send('Task not longer exist');
    }
});
exports.deleteTask = deleteTask;

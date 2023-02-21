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
exports.getUserList = exports.testName = exports.loginUser = exports.newUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const list_1 = require("../models/list");
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, role } = req.body;
    try {
        if (!userName)
            return res.status(400).send('Name can not be null');
        if (!password)
            return res.status(400).send('Password can not be null');
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
            return res.status(201).send(newUser);
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).send("Name already exist.");
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        //Validate if user exist
        const user = yield user_1.User.findOne({
            where: {
                userName
            }
        });
        if (!user) {
            return res.status(400).json({ msg: `Username ${userName} not exist in our database` });
        }
        //Validate password
        const passwordOk = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordOk)
            return res.status(400).json({ msg: "invalid password" });
        //Generate token
        const token = jsonwebtoken_1.default.sign({
            userName,
            role: user.role
        }, process.env.SECRET_KEY || "pepito flores");
        return res.status(200).json({ token });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Server not responding');
    }
});
exports.loginUser = loginUser;
const testName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.body;
    try {
        const checkNameAviability = yield user_1.User.findOne({
            where: {
                userName
            }
        });
        if (checkNameAviability) {
            return res.status(400).json({ aviable: false, msg: "Username not aviable" });
        }
        else
            return res.status(200).json({ aviable: true, msg: "Username aviable" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('Server not responding');
    }
});
exports.testName = testName;
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.headers['authorization'];
    if (headerToken !== undefined) {
        const bearerToken = headerToken.slice(7);
        const roleCheck = jsonwebtoken_1.default.decode(bearerToken);
        try {
            const userList = yield user_1.User.findAll({ include: {
                    model: list_1.List,
                    attributes: ["title"]
                } });
            if (userList.length !== 0) {
                return res.status(200).send(userList);
            }
            else
                return res.status(404).json({ msg: "Theres no user in database" });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("server goes wrong");
        }
    }
    else
        return res.status(404).send("Token invalid");
});
exports.getUserList = getUserList;

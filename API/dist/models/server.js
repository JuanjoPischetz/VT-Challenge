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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
const list_1 = __importDefault(require("../routes/list"));
const user_1 = __importDefault(require("../routes/user"));
const user_2 = require("./user");
const list_2 = require("./list");
const traslatecheck_1 = require("./traslatecheck");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen on ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/list', list_1.default);
        this.app.use('/api/users', user_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_2.User.hasMany(list_2.List);
                list_2.List.belongsTo(user_2.User);
                user_2.User.hasOne(traslatecheck_1.TranslateCheck);
                traslatecheck_1.TranslateCheck.belongsTo(user_2.User);
                yield connection_1.default.sync({ alter: true });
                console.log('Successfull');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Server;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../controllers/list.controller");
const router = (0, express_1.Router)();
router.get('/', list_controller_1.getList);
exports.default = router;

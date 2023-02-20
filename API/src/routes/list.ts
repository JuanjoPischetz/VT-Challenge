import { Router } from "express";
import { getList } from "../controllers/list.controller";

const router = Router();

router.get('/', getList)

export default router;
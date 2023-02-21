import { Router } from "express";
import { deleteTask, getList, postTask, updateTask } from "../controllers/list.controller";
import { validateToken } from "../controllers/validateToken.controller";

const router = Router();

router.get('/',validateToken ,getList)
router.post('/',validateToken ,postTask)
router.put('/',validateToken ,updateTask)
router.delete('/',validateToken ,deleteTask)


export default router;
import { Router } from "express";
import { getUserList, loginUser, newUser, testName } from "../controllers/user.controller";
import { validateToken } from "../controllers/validateToken.controller";

const router = Router();

router.post('/', newUser)
router.post('/login', loginUser)
router.get('/',testName)
router.get('/admin',validateToken, getUserList)

export default router;
import { Router } from "express";
import { getUserList, loginUser, newUser, testName, translateUpdate } from "../controllers/user.controller";
import { validateToken } from "../controllers/validateToken.controller";

const router = Router();

router.post('/', newUser)
router.post('/login', loginUser)
router.get('/',testName)
router.get('/admin',validateToken, getUserList)
router.put('/', validateToken, translateUpdate)

export default router;
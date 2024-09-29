import { Router } from "express"
import { login, register, forgotPassword, resetPassword } from "../controllers/authController.js"

const router = new Router()


router.post("/signup", register)


router.post("/login", login)

router.post("/user/forgot-password", forgotPassword)
router.post("/user/reset-password", resetPassword)



export default router
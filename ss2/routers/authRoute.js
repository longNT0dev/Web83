import { Router } from "express"
import { login, register } from "../controllers/authController.js"

const router = new Router()


router.post("/signup", register)


router.post("login", login)


export default router
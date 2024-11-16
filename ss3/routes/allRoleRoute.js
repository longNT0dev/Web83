import { Router } from "express"
import { createInformationAccount, getInformationAccount } from "../controllers/allRouteController.js"
const router = new Router()


router.get("/get-information", getInformationAccount)
router.post("/create-information", createInformationAccount)


export default router
import { Router } from "express"
import { getComments, getThreeLastComments } from "../controllers/commentController.js";


const router = new Router();

router.get("/all", getComments)
router.get("/three-latest-comment", getThreeLastComments)

export default router
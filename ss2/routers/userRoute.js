import { Router } from "express"
import { createPost, updatePost } from "../controllers/userController.js";

const router = new Router();

router.post("/create-post", createPost)
router.post("/update-post", updatePost)
// router.put("/update")
// router.delete("/delete")

export default router
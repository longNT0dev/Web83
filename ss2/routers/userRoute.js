import { Router } from "express"
import { createPost, updatePost, getPosts } from "../controllers/userController.js";

const router = new Router();

router.get("/getAllPost/:page", getPosts)
router.post("/create-post", createPost)
router.post("/update-post", updatePost)
router.get("/", (req, res) => {
    console.log(req.user)
})
// router.put("/update")
// router.delete("/delete")

export default router
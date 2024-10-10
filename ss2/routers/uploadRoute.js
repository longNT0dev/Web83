import { Router } from "express"
import { uploadSingleFile } from "../controllers/uploadController.js"
import multer from 'multer';

const router = new Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/single", upload.single("avatar-file"), uploadSingleFile)

// router.post("/multiple")


export default router
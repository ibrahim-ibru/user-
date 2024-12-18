import { Router } from "express";
import * as cntrl from "./Controller/user.controller.js"

const router=Router()

router.route("/adduser").post(cntrl.addUser)
export default router
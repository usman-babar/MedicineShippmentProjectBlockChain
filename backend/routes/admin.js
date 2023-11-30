import express from "express";

import { getAdmins, signin } from "../controller/adminController.js";

const router = express.Router();

router.get("/all", getAdmins);
router.post("/signin", signin);
// router.put("/update", editAdmin);

export default router;
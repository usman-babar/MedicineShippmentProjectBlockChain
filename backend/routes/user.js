import express from "express";

import {
    signIn,
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  searchUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/add", addUser);
router.get("/all", getUsers);
router.post("/search", searchUser);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
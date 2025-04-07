import loginController from "./controller/loginController";
import express from "express";
import { verifyJWT } from "./midleware/loginMiddleware";

export const router = express.Router();

router.get('/login', verifyJWT, loginController.getAllLogin);
router.get('/login/:id', loginController.getLoginById);
router.post('/login', loginController.createLogin);
router.post('/auth/login', loginController.postLogin);

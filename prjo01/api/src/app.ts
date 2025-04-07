import {router} from "./router";
import express from "express";
import cors from "cors";

export const app = express();
app.use(cors());    
app.use(express.json());
app.use(router);
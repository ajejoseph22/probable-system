import express from "express";
import exchangeController from "../controllers/exchange";

const router = express.Router();

router.get("/", exchangeController);

export default router;

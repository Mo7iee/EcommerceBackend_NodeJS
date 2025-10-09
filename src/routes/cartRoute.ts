import express from "express";
import { getActiveCart } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendedRequest } from "../middlewares/validateJWT.js";

const router = express.Router()

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req.user?._id;  
  const cart = await getActiveCart({ userId });
  res.status(200).send(cart);
});


export default router;


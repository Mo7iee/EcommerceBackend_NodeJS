import express from "express";
import { addItemToCart, getActiveCart, updateItemInCart } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendedRequest } from "../middlewares/validateJWT.js";
import { getProductById } from "../services/productService.js";

const router = express.Router()

router.get("/", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req.user?._id;  
  const cart = await getActiveCart({ userId });
  res.status(200).send(cart);
});
router.post("/items", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);

}
)
router.put("/items", validateJWT, async (req: ExtendedRequest, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  const response = await updateItemInCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);

}
)

export default router;


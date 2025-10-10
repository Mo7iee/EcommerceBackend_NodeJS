import { cartModel } from "../models/cartModel.js";
import type { cartDTO } from "./DTOs/cartDTO.ts";
import type { addItemToCartDTO } from "./DTOs/addItemToCartDTO.ts";
import { productModel } from "../models/productModel.js";

const createCart = async ({ userId }:cartDTO) =>{
    const cart = await cartModel.create({userId})
    await cart.save();
    return cart;
}

export const getActiveCart = async ({ userId }:cartDTO) =>{
    let cart = cartModel.findOne({userId,status:"active"})
    if(!cart){
        const cart = await createCart({userId})
    }
    return cart;
}
export const addItemToCart = async ({ productId,quantity,userId }:addItemToCartDTO) =>
    {
        const cart = await getActiveCart({userId})
        const existsInCart = cart?.items.find((p) => p.product === productId);
        if(existsInCart){
            return{data:"Product already exists in cart",statusCode:400}
        }
        const product = await productModel.findById(productId);
        if(!product){
             return{data:"Product not found",statusCode:400}


        }
        cart?.items.push({product:productId,unitPrice:product.price,quantity: parseInt(quantity)})
        const updatedCart = await cart?.save();

        return { data: updatedCart, statusCode:200}
    }
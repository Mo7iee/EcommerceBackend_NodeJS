import { cartModel } from "../models/cartModel.js";
import type { cartDTO } from "./DTOs/cartDTO.ts";

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
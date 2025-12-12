import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProducts =async (req,res)=>{
    const {name,price,image}=req.body;

    if(!name&&!price&&!image){
        return res.status(400).json({message:"All fields are required"});
    }
    const newProduct= Product({name,price,image});
    try{
        await newProduct.save();
        res.status(201).json({
            success:true,
            data:newProduct
        });
    }
    catch(err){
        console.error("error: " ,err);
        res.status(500).json({message:"Server Error"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id}=req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            message:"Product deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            message:"Product not found"
        });
    }

}

export const updateProduct = async (req,res)=>{
    const {id}=req.params;
    const {name,price,image}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,       
            message:"Invalid ID provided"
        });
    }
    try {
       const updatedProduct= await Product.findByIdAndUpdate(id,{name,price,image},{new:true});
        res.status(200).json({
            success:true,
            data:updatedProduct,
            message:"Product updated successfully"
        });
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Product not found"
        });
    }
}
export const getProducts =async (req,res)=>{
    try{
        const products= await Product.find({});
        res.status(200).json({
            success:true,
            data:products
        });
    }
    catch(err){
        console.error("error: " ,err);
        res.status(500).json({
            message:"Server Error"
        })
    } 
} 
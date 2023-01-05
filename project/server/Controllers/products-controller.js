const productTemplate=require("../models/Product");
const path=require('path');
const fs = require('fs');

// .. for step backward
var dir = path.join(__dirname, '..', 'public');

const getAllProducts=async(req,res)=>{
    try
    {
        //variable products contains all of the products
       const products=await productTemplate.find({user_id:req.user.id});
        if(!products) return res.status(404).json({message:"Oops! No products found..."});

        res.status(200).json({products});
    }
    catch(err){
        res.status(400).json({error: 'Something went wrong.'});
    }
}

// ADD PRODCUTS
const addProduct=async(req,res)=>{
    try
    {
        const {user: {id}, body: { name, brand, description, price }, file }=req;
        let file_location = '/uploads/' + file.filename;

        const product= new productTemplate({
            name,
            brand,
            description,
            price,
            selectedFile: file_location,
            user_id: id
        });

        //function save will save data in database
        await product.save();

        // ako je dodavanje proizvoda neuspješno
        if(!product) return res.status(500).json({message: "You are unable to add new product at this time."});

        res.status(201).json({product});
    }
    catch(err)
    {
        res.status(400).json({error: 'Provide all info.'});
    }
}

const getByIdentifier=async (req, res)=>{
    
    try
    {
       const identifier=req.params.id;
       const product=await productTemplate.findOne({_id: identifier});
       
       if(!product) return res.status(401).json({message: "Product not found."});
        
      res.status(201).json({product});
    }
    catch(err)
    {
        res.status(401).json({error: 'Something went wrong.'});
    }
    
}
const deleteProduct=async(req,res)=>{
    try
    {
        const identifier=req.params.id;
        //
        const product=await productTemplate.findOne({_id: identifier});

        if(!product) return res.status(404).json({message: "Unable to delete by this ID" })

        // we add product?
        if(product.user_id !== req.user.id)
            return res.status(404).json({message: "Unable to delete" })

        await productTemplate.deleteOne({_id: identifier});

        // delete image 
        var file = path.join(dir, product.selectedFile);

        fs.unlink(file, (error) => {console.log(error)});
        
        res.status(200).json({message: "Product successfully deleted."});
    }
    catch(err)
    {
        res.status(400).json({error: 'Something went wrong.'});
    }
}

// dohvacanje proizvoda

const listProducts = async(req,res,next)=>{
    try {
        const products=await productTemplate.find();

        res.status(200).json({products});
    }
    catch(err) {
        res.status(400).json({error: 'Ooops.'})
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    getByIdentifier,
    deleteProduct,
    listProducts
}
//exports.deleteProduct=deleteProduct

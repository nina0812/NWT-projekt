const mongoose=require('mongoose');
const productTemplate= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required:true,
        },
        description: {
            type: String,
            required:true,
        },
        price: {
            type: Number,
            required:true,
        },
        selectedFile: {
            type:String,
            required:false
        },
        user_id: {
            type: String,
            require:true
        }
    }
)
module.exports=mongoose.model("Product", productTemplate)
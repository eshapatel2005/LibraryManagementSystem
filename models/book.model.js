const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        author:{
            type:String,
            required:true
        },

        category:{
            type:String,
            required:true
        },

        isbn:{
            type:String,
            required:true,
            unique:true
        },

        isIssued:{
            type:String,
            default:false
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Book",bookSchema);
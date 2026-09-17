const express=require("express");
const cors=require("cors");
require("dotenv").config();

const connectDB=require("./database/connection");

const bookRoutes = require("./routes/books.routes");
const userRoutes = require("./routes/users.routes");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Libraray Management System API is running"
    });
});

const PORT=process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
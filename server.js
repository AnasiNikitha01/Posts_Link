import express from "express";
import {configDotenv} from "dotenv";
import mongoose from "mongoose";
import userSchema from "./Usermodel.js";
import cors from "cors";

const app = express();

app.use(express.json());

configDotenv();

app.use(cors());

async function connectDB(){     
    try {
        const connect =await mongoose.connect(process.env.Mongo_url);
        console.log("connection setup done");
    } catch (error) {
        console.log(`mongo error ${error}`);
    }
}

connectDB();

app.post('/posts',async(req,res)=>{
    const {username,email,content} = req.body;
    console.log(username,email,content);
    try {
        const data_post = await userSchema.create({
            username,
            email,
            content
        });

        if(data_post){
            console.log(`Data posted succesfull`);

            res.status(200).json({
                message : 'Data posted successfully',
                data : {
                    data_post
                }
            })
        }

    } catch (error) {
        console.log("error in posting data to database");

        res.status(400).json({
            message : "error in posting data to database",
        })
    } 
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{      
    console.log(`listening to port ${PORT}`);   
}) ;

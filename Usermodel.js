import { Schema,model } from "mongoose";

const schema = new Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true
    }
},{
    timestamps : true,
});

const userSchema = model('schema',schema);
export default userSchema;
import mongoose, {Schema, Document} from "mongoose";
import { BlockList } from "net";

// type script schema
export interface Message extends Document{
    content: string;
    createdAt: Date;
}

//mongoose schema 
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// type script schema
export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

//mongoose schema 
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"], //if username is not in then this message display
        trim: true, //remove space from the username
        unique: true, // for every username is unique
    },
    email: {
        type: String,
        required: [true, "Email is required"], //if Email is not in then this message display
        unique: true, // for every username is unique
        match: [/.+\@.+\..+/,'Please use a vaild email address.' ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema], //using custom Message Schema from above message schema

})

//NextJS run on edge server, it continues run server, bootup every time so we export data differently in NextJS.
//export Model

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
// if user model already exist, get user model as <User> model not any model want ,want only given Model (typeScript) 
// after || is for, create new model, here<User> is provide model type
export default UserModel;
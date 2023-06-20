import { Schema, model, models, Document, Model } from "mongoose"
export interface UserDocument extends Document {
    email: string;
    fullName: string;
    username: String;
    password: String;
    role: string;
}

const UserSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minLength: [4, "Full name should be atleast 4 characters long"],
        maxLength: [30, "Full name should be less than 30 characters"]
    },
    username: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        required: [true, "role is required"]
    }
})

let User: Model<UserDocument>;

try {
  // Try to retrieve the existing User model
  User = model<UserDocument>('User');
} catch (error) {
  // If the User model doesn't exist, create it
  User = model<UserDocument>('User', UserSchema);
}

export default User;


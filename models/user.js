import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        day: {
            type: Number,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required:true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        }
        

    },
    { timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;
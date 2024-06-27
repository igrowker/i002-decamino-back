import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }],
    role: {
        type: String,
        enum: ['usuario', 'administrador'],
        default: 'usuario'
    }
},
    {
        timestamps: true
    });

    const User = mongoose.model('User', userSchema);
    export default User;
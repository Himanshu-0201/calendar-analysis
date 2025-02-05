import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // Removes whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that emails are unique
        lowercase: true, // Converts email to lowercase
        trim: true, // Removes whitespace
    },
    accessToken: {
        type: String,
        required: true, // Make this required as you want to store it
    },
    refreshToken: {
        type: String,
        required: true, // Make this required as you want to store it
    },
    expireDate : {
        type : Number,
        require : true
    },
    reportSubscriptionStatue : {
        type : Boolean,
        require : true,
        default : false
    },
    reportSubscriptionEmail : {
        type : String,
        require : true
    }
}, { timestamps: true }); // Automatically creates createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose'

const { Schema } = mongoose;


const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: String,
    createdDate: { type: Date, default: Date.now },
    productTrackingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    phone_number: { type: String, required: true },
    role: { type: String, default: 'user' },
});

const User = mongoose.model('User', userSchema);
export default User;  
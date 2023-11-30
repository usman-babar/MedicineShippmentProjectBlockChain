import mongoose from 'mongoose'

const {Schema} = mongoose;

const adminSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, maxlength: 10, required: true, unique: true },
});

const Admin = mongoose.model('admin', adminSchema);
export default Admin;
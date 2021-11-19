import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    Type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: {
        type: String,
        unique: true
    }
})

// export model
export default mongoose.model('User', userSchema);
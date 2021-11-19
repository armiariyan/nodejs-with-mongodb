import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusSchema = mongoose.Schema({
    _id: Number,
    Label: String
})

// export model
export default mongoose.model('Status', statusSchema);
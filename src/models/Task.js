import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }],
    StatusId: [{
        type: Schema.Types.Number,
        ref: 'Status'
    }],
    task: String,
    completed: Boolean,
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
})

// export model
export default mongoose.model('Task', taskSchema);
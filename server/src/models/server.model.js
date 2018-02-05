import mongoose from 'mongoose';

let Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    fieldText: String,
    fieldDesc: String,
    editNow: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Field', Schema);
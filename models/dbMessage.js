import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: String,
    username: String,
    timeStamp: String,
    room: String
})

export default mongoose.model('message', messageSchema)
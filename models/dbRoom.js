import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    username: String,
    room: Array
})

export default mongoose.model('room', roomSchema, 'room');
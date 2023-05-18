import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    username: String,
    password: String
})

export default mongoose.model('whatsapp-user', messageSchema)
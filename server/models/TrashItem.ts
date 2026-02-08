import mongoose from 'mongoose'

const TrashSchema = new mongoose.Schema({
userId: String,
item: String,
category: String,
source: String,
createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('TrashItem', TrashSchema)



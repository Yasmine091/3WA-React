import mongoose from 'mongoose';
const Schema = mongoose.Schema
const chocolateSchema = new Schema({
 name : String,
 description : String,
 brand : String,
 price: Number,
 weight: Number
})

const Chocolate = mongoose.model('Chocolate', chocolateSchema)

// module.exports = chocolate
export default Chocolate;
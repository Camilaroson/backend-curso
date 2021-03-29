const mongoose = require('mongoose')

const productoCollection = 'productos'

const productoSchema = new mongoose.Schema({

titulo: {type:String , require:true , max:150},
precio: {type:Number, require:true},
imagen: {type:String, require:true}

})

module.exports = mongoose.model(productoCollection ,productoSchema)
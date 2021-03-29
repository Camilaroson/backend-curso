const mongoose = require('mongoose')

const chatCollection = 'mensajes'

const chatSchema = new mongoose.Schema({

email: {type:String , require:true , max:150},
inputMensaje: {type:String, require:true}

})

module.exports = mongoose.model(chatCollection , chatSchema)


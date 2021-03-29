//inicializacion express y socket

import { Socket } from 'dgram';
import express from 'express';
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import moment from 'moment';
import fs from "fs"
const mongoose = require('mongoose')
const chatModel = require('./models/chatModel')
const productoModel = require('./models/productosModel')



var router = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


// routers
app.use('/api', require('./productos'))


io.on('connection', (socket:any) => {
    //recibe lo que viene del script formulario
    socket.on('producto nuevo', (message:any)=>{
       console.log(message) //el  mensaje me traeria los datos del input
        io.emit('producto nuevo', message); //muestra a todoslos usuarios en tiempo rea
        const saveProducto = new productoModel(message)
        saveProducto.save()

    })
   
    socket.on('mensaje del chat', (data:any) =>{
        console.log(data)
        io.emit('mensaje del chat',data);
        const saveChat = new chatModel(data)
        saveChat.save()
       

    })
      
    })


http.listen(3333, () => {
mongoose.connect('mongodb://localhost:27017/ecommerce-1',
    {
     useNewUrlParser: true, 
     useUnifiedTopology: true
    }
   )

   .then( () => console.log('Todo ok'))
   .catch((err:any) => console.log(err))
  
})

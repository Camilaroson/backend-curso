//inicializacion express y socket

import { Socket } from 'dgram';
import express from 'express';
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import moment from 'moment';

var router = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'))



//cargo modulo handlebars 
import handlebars from 'express-handlebars'

//configuracion handle

app.engine (
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + '/views/partials/'
    })

)

app.set("view engine","hbs")
app.set("views","./views")






// routers
app.use('/api', require('./productos'))


io.on('connection', (socket:any) => {
    //recibe lo que viene del script formulario
    socket.on('producto nuevo', (message:any)=>{
        console.log(message) //el mensaje me traeria los datos del input
        io.emit('producto nuevo', message) //muestra a todos los usuarios en tiempo real
   
   
   
    })
   
    socket.on('mensaje del chat', (data:any) =>{
        console.log(data)
        io.emit('mensaje del chat',data)
    })

})




// Listen - cambia a http

/*
app.listen(8080 , () =>{
    console.log('Servidor listo!')
})

*/

http.listen(3333, () => {
    console.log('Servidor listo :)')
})

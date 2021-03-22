//inicializacion express y socket

import { Socket } from 'dgram';
import express from 'express';
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import moment from 'moment';
import fs from "fs"

var router = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


//SQLITE//
/*
const {sqlite3} = require('./DB/SQLite.db')
const knex = require('knex')(sqlite3)*/

//MYSQL//

const {mysql} = require('./DB/MYSQL.db')
const knex = require('knex')(mysql)


//CREO LA TABLA DE MENSAJES - SQLITE
/*
knex.schema.createTable('mensajes', (table: { string: (arg0: string, arg1: number) => void }) =>{
  table.string('inputMensaje',50)
  table.string('email',100)
})
.then(()=> console.log('Se creo la tabla'))
.catch((err:any) => console.log(err))
*/

//CREO LA TABLA DE PRODUCTOS - MYSQL

knex.schema.createTable('productos', (table: { increments: (arg0: string) => void; string: (arg0: string, arg1: number) => void; integer: (arg0: string, arg1: number) => void }) =>{
  table.increments('id')
  table.string('titulo',50)
  table.integer('precio',100)
  table.string('imagen',50)
})
.then(()=> console.log('Se creo la tabla'))
.catch((err:any) => console.log(err))


// routers
app.use('/api', require('./productos'))


io.on('connection', (socket:any) => {
    //recibe lo que viene del script formulario
    socket.on('producto nuevo', (message:any)=>{
      //  console.log(message) //el mensaje me traeria los datos del input
        io.emit('producto nuevo', message) //muestra a todos los usuarios en tiempo real
        knex('productos').insert(message)
        .then(()=>console.log("producto guardado"))
        .catch((err:any)=>console.log(err))
   
  
    })
   
    socket.on('mensaje del chat', (data:any) =>{
       // console.log(data)
        io.emit('mensaje del chat',data)
        //GUARDAR SQLITE
     /* knex('mensajes').insert(data)
        .then(()=>console.log("mensaje guardado"))
        .catch((err:any)=>console.log(err))

        //CREO ARCHIVO DE TEXTO
        const guardarMensajes = JSON.stringify(data)
        fs.appendFileSync('./productos.txt', '\n' + guardarMensajes) */
    })
      
    })


http.listen(3333, () => {
    console.log('Servidor listo :)')
})

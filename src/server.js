"use strict";
//inicializacion express y socket
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var router = express_1.default.Router();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
//cargo modulo handlebars 
const express_handlebars_1 = __importDefault(require("express-handlebars"));
//configuracion handle
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "hbs");
app.set("views", "./views");
// routers
app.use('/api', require('./productos'));
io.on('connection', (socket) => {
    //recibe lo que viene del script formulario
    socket.on('producto nuevo', (message) => {
        console.log(message); //el mensaje me traeria los datos del input
        io.emit('producto nuevo', message); //muestra a todos los usuarios en tiempo real
    });
    socket.on('mensaje del chat', (data) => {
        console.log(data);
        io.emit('mensaje del chat', data);
    });
});
// Listen - cambia a http
/*
app.listen(8080 , () =>{
    console.log('Servidor listo!')
})

*/
http.listen(3333, () => {
    console.log('Servidor listo :)');
});


//Obtengo los elementos del html
const formularioChat = document.getElementById('formulario-chat')
const email = document.getElementById('email')
const inputMensaje = document.getElementById('mensaje')
const mensaje = document.getElementById('mostrarMensajes')
var hoy = new Date()

formularioChat.addEventListener('submit', (event) =>{
    event.preventDefault()
        socket.emit('mensaje del chat', { 
        inputMensaje : inputMensaje.value,
        email : email.value
        })
        inputMensaje.value = ''
        })

 socket.on('mensaje del chat',(data)=>{
 
 mensaje.innerHTML += `<p><span class ="email" >${data.email}</span>,<span class='hora'>[${hoy}] </span> : <span class= 'message'> ${data.inputMensaje} </span> </p>`

})
        
        
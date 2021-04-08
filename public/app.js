
const socket = io();

const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')
const user = document.getElementById('user')

/* let socket.id = user.value
user.addEventListener('change', (e) => {
    e.preventDefault();
    socket.id = user.value
    console.log(socket.id);
}) */


socket.emit('joined')

socket.on('prev_msgs', msgs => {
    msgs.forEach(msg => {
        const item = document.createElement('div')
        const message = document.createElement('div')
        const span = document.createElement('span')
        
        if (msg.id == socket.id) {
            span.classList.add('msg_user_send')
        }else{
            span.classList.add('msg_user')
        }

        span.textContent = msg.id

        if (msg.id == socket.id) {
            message.classList.add('msg_cotainer_send')
        }else{
            message.classList.add('msg_cotainer')
        }
        
        message.textContent = msg.msg

        if (msg.id == socket.id) {
            item.classList.add('d-flex', 'justify-content-end', 'mb-4')
        }else{
            item.classList.add('d-flex', 'justify-content-start', 'mb-4')
        }
        message.appendChild(span)
        item.appendChild(message)
        messages.appendChild(item)
        window.scrollTo(0, document.body.scrollHeight)
    });
}) 

form.addEventListener('click', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit('chat_msg', {id: socket.id, msg: input.value})
        input.value = ''
    }
})

socket.on('chat_msg', msg => {
    const item = document.createElement('div')
    const message = document.createElement('div')
    const span = document.createElement('span')
    
    if (msg.id == socket.id) {
        span.classList.add('msg_user_send')
    }else{
        span.classList.add('msg_user')
    }

    span.textContent = msg.id

    if (msg.id == socket.id) {
        message.classList.add('msg_cotainer_send')
    }else{
        message.classList.add('msg_cotainer')
    }
    
    message.textContent = msg.msg

    if (msg.id == socket.id) {
        item.classList.add('d-flex', 'justify-content-end', 'mb-4')
    }else{
        item.classList.add('d-flex', 'justify-content-start', 'mb-4')
    }
    message.appendChild(span)
    item.appendChild(message)
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
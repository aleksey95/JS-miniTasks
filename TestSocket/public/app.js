/*
(Client)Test WebSocket:
methods: close(),send(); // Метод send(str) принимает ТОЛЬКО один параметр.
properties: binaryType, bufferedAmount, extensions,protocol,readyState;
events: open,close,message,errors
 */



const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

function setStatus(value,color) {
    status.innerHTML = value;
    status.style.color = color;
}

function printMessage(value) {
    const li = document.createElement('li');
    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit',event=>{
    event.preventDefault();
    ws.send(input.value);
    input.value = "";
})




// необходимо получать автоматически
// const ws = new WebSocket('ws://localhost:3000');
const ws = new WebSocket('ws://192.168.31.233:3000');

ws.onopen = () => setStatus('ONLINE');
ws.onclose = () => setStatus('Disconnected','red');
// ws.onerror = (error) => console.warn('Error', error);
ws.onmessage = response => printMessage(response.data);
// ws.send(); // Отправка данных используется выше
// ws.close(); // Разрыв соедениния

console.group('Test WebSocket API');
console.log(`binaryType: ${ws.binaryType}`);
console.log(`bufferedAmount: ${ws.bufferedAmount}`)
console.log(`extensions: ${ws.extensions}`);
console.log(`protocol: ${ws.protocol}`);
console.log(`urlServer:  ${ws.url}`);
// console.log(`readyState:  ${ws.readyState}`); 0 - connecting, 1- open, 2- closing, 3-closed
console.groupEnd();

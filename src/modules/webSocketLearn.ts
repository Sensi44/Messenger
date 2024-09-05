// // const socket = new WebSocket('wss://example.com/ws')
//
// export default 1;
// const socket = new WebSocket('wss://ws.postman-echo.com/raw');
// // console.log('logSocket', socket);
//
// const logger = (eventName: string) => (event: Event | MessageEvent) => console.log(eventName, event);
//
// socket.addEventListener('open', logger('Open: ')); // соединение установлено
// socket.addEventListener('message', logger('Message: ')); // пришло новое сообщение
// socket.addEventListener('error', logger('Error: ')); // ошибка
// socket.addEventListener('close', logger('Close: '));
//
// // 0 – CONNECTING — соединение ещё не установлено
// // 1 – OPEN — соединение установлено, обмен данными
// // 2 – CLOSING — соединение закрывается
// // 3 – CLOSED — соединение закрыто
// // console.log(socket.readyState);
// if (socket.readyState === 1) {
//   socket.send('Hello, Server!');
// }
//
// setTimeout(() => {
//   socket.send('Hello, Server!');
// }, 500);

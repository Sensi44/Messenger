const baseUrl = 'wss://ya-praktikum.tech/ws/chats/';
import type { StoreState } from './store/store.types.ts';

let webSocket: WebSocket | null = null;

let pingPongInterval: any;

export function webSocketConnect() {
  return new Promise<WebSocket>((resolve, reject) => {
    const { user: currentUser, selectedChatId, wsToken } = window.store.getState() as StoreState;

    if (!(currentUser?.id && selectedChatId && wsToken)) {
      console.log('Соединение не может быть установлено');
      return;
    }

    webSocket = new WebSocket(`${baseUrl}${currentUser.id}/${selectedChatId}/${wsToken}`);

    webSocket.addEventListener('open', () => {
      console.log('Соединение по веб сокет установлено - успешно');

      pingPongInterval = setInterval(() => {
        if (webSocket?.readyState === WebSocket.OPEN && webSocket) {
          webSocket.send(JSON.stringify({ type: 'ping' }));
        }
      }, 25000);
      if (webSocket) {
        resolve(webSocket);
      } else {
        reject();
      }
    });

    webSocket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('было чисто закрыто');
      } else {
        console.log('оборвали соединение');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      if (pingPongInterval) {
        clearInterval(pingPongInterval);
        pingPongInterval = null;
      }
    });

    webSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      // console.log('данные в ответе от сервера - вебсокет: ', data);

      if (data.type === 'pong') {
        console.log('Понг от сервера!');
      } else if (data.type === 'message') {
        console.log('Пришло сообщение: ', data);
        const currentMessages = (window.store.getState() as StoreState).messages || [];
        window.store.set({ messages: [data, ...currentMessages] });
      } else if (data.type === 'get old') {
        console.log('Старые сообщения: ', data.messages);
      } else if (Array.isArray(data)) {
        window.store.set({ messages: data });
      } else {
        console.log('Получены данные', data);
      }
    });

    webSocket.addEventListener('error', (event) => {
      console.log('Ошибка в вебСокете', event);
    });

    return webSocket;
  });
}

export function sendMessage(message: string) {
  if (webSocket?.readyState === WebSocket.OPEN && webSocket) {
    console.log('Пошла отправка сообщения');
    webSocket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  } else {
    console.log('Не получилось отправить сообщение');
  }
}

export function getAllOldMessages(offset: string = '0') {
  if (!webSocket) {
    console.log('Вебсокет соединение отсутствует, getAllOldMessages');
  } else if (webSocket.readyState !== WebSocket.OPEN) {
    console.log('соединение не открыто');
  }

  if (webSocket?.readyState === WebSocket.OPEN && webSocket) {
    console.log('get old?');
    webSocket.send(
      JSON.stringify({
        content: String(offset),
        type: 'get old',
      })
    );
  } else {
    console.log('WebSocket-соединение не установлено');
  }
}

interface Message {
  owner: boolean;
  message: string;
  time: string;
}

interface Chat {
  name: string;
  lastMessage: string;
  img: string;
  ownMessage: boolean;
  date: string;
  unreadCounter?: number; // необязательное поле
  select?: boolean; // необязательное поле
  chat?: Message[]; // теперь это необязательное поле
}

type ChatListContext = Chat[];

export const chatListContext: ChatListContext = [
  {
    name: 'Андрей',
    lastMessage: 'стикер',
    img: 'src/assets/img/1.png',
    ownMessage: false,
    date: '10:49',
    unreadCounter: 15,
    chat: [
      {
        owner: false,
        message: 'стикер',
        time: '11:55',
      },
      {
        owner: true,
        message: 'сам такой',
        time: '11:54',
      },
    ],
  },
  {
    name: 'Ревьюверы',
    lastMessage: 'Я тут подумал что 20 часов в неделю кажется мало для всего этого...',
    img: 'src/assets/img/2.png',
    ownMessage: true,
    date: 'Ср',
    select: true,
    // chat: [
    //   {
    //     owner: true,
    //     message: 'И я вновь утверждаю что 20 часов в неделю мало для всего этого...',
    //     time: '11:54',
    //   },
    // ],
  },
  {
    name: 'Паприка',
    lastMessage: 'ясно, а потом очень длинное сообщение которое уходит в 3 точки 123 123 123 12 3123123',
    img: 'src/assets/img/3.png',
    ownMessage: false,
    date: '5 мая 2021',
    unreadCounter: 6,
    // chat: [
    //   {
    //     owner: false,
    //     message: 'ясно, а потом очень длинное сообщение которое уходит в 3 точки 123 123 123 12 3123123',
    //     time: '11:53',
    //   },
    // ],
  },
];

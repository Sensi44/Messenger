type chat = {
  owner: boolean;
  message: string;
};

export type IChatWindowProps = {
  currentChat: chat[];
  openModal: (show: boolean, mode: boolean) => void;
  userData: {
    avatar: string;
    name: string;
  };
};

export type IChatWindowPropsKeys = keyof IChatWindowProps;

export type IChatWindowProps = {
  currentChat: number | string;
  openModal: (show: boolean, mode: boolean) => void;
  userData: {
    avatar: string;
    name: string;
  };
};

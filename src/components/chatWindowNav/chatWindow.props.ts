export interface IChatWindowNavProps {
  name: string;
  avatar: string;
  isOpen: boolean;
  openModal: (show: boolean, mode: boolean) => void;
}


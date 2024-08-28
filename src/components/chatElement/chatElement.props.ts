export interface ChatElementProps {
  select?: boolean;
  img: string;
  name: string;
  date: string;
  ownMessage: boolean;
  lastMessage: string;
  unreadCounter?: number;
}

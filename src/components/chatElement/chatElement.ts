import Block from '../../modules/block';

type ChatElementProps = {
  select?: boolean;
  img: string;
  name: string;
  date: number;
  ownMessage: boolean;
  lastMessage: string;
  unreadCounter?: number;
  events?: {
    click?: (e: MouseEvent) => void;
  };
};
type ChatElementChildren = {};

class ChatElement extends Block<ChatElementProps, ChatElementChildren> {
  constructor(props: ChatElementProps & ChatElementChildren) {
    super(props);
  }

  render() {
    return `
      <li class="chatListElement {{#if select}}chatListElement_active{{/if}}">
        <div class="chatListElement__container">
          <img src="{{img}}" class="messengerPage__avatar" alt="Аватар_{{name}}" />
          <div class="chatListElement__body">
            <div class="chatListElement__top">
              {{#Typography as="span" style="text-s" className="chatListElement__name"}}{{name}}{{/Typography}}
              {{#Typography as="time" style="text-xs"}}{{date}}{{/Typography}}
            </div>
            <div class="chatListElement__bottom">
              {{#Typography as="span" style="text-xs" className="chatListElement__lastMessage"}}
                {{#if ownMessage}}<span class="bold">Вы: </span>{{/if}}{{lastMessage}}
              {{/Typography}}
              {{#if unreadCounter}}<span class="chatListElement__counter">{{unreadCounter}}</span>{{/if}}
            </div>
          </div>
        </div>
      </li>
    `;
  }
}

export default ChatElement;

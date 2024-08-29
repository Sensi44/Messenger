import Block from '../../modules/block';

type test = {
  message: string;
  owner: boolean;
};

class ChatMessage extends Block<object> {
  constructor(props: test) {
    super(props);
  }

  render() {
    return `
        <li>
          <div>{{owner}}</div>
          <div>{{message}}</div>
        </li>
    `;
  }
}

export default ChatMessage;

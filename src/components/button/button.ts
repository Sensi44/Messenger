import Block from '../../modules/block';

class Button extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: props.submit,
      },
    });


  }

  render() {
    return `
        <button class="button button__{{type}} {{className}}">
          {{label}}
       </button>
    `;
  }
}

export default Button;

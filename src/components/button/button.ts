import Block from '../../modules/block';

class Button extends Block {
  props;

  constructor(props) {
    super({
      ...props,
      withInternalID: true,
    });
    this.props = props;
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

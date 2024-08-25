import Block from '../../modules/block.ts';
import ButtonHbs from './button.hbs?raw';

class Button extends Block {
  props;

  constructor(props) {
    super({
      ...props,
      withInternalID: true,
      // events: {
      //   click: (event) => {
      //     console.log(event);
      //   },
      // },
    });
    this.props = props;
  }

  render() {
    console.log('BUTTON PROPS:', this.props);
    // return this.compile(ButtonHbs as string, this.props);
    return `<button class="button button__{{type}} {{className}}">
  {{label}}
</button>`;
  }
}

export default Button;

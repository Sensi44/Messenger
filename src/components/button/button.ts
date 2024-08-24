import Block from '../../modules/block.ts';
import ButtonHbs from './button.hbs?raw';

class Button extends Block {
  props;

  constructor(props) {
    super('div', { ...props, withInternalID: true });
    this.props = props;
  }

  render() {
    console.log('BUTTON PROPS:', this.props);
    return this.compile(ButtonHbs as string, this.props);
  }
}

export default Button;

import Block from '../../modules/block';

import type { IButtonProps } from './button.props.ts';
class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.submit,
      },
    });
  }

  render() {
    console.log(this.props);
    return `
        <button class="button button__{{type}} {{className}}">
          {{label}}
       </button>
    `;
  }
}

export default Button;

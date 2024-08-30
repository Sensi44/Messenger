import Block from '../../modules/block';

import type { IButtonProps } from './button.props.ts';
class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.submit as (e: MouseEvent) => void,
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

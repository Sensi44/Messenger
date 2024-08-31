import Block from '../../modules/block';
// import type { IButtonProps } from './button.props.ts';

type ButtonProps = {
  type?: string;
  className?: string;
  label?: string;
  submit?: (e: MouseEvent) => void;
  events?: {
    click?: (e: MouseEvent) => void;
  };
};
type ButtonChildren = {};

class Button extends Block<ButtonProps, ButtonChildren> {
  constructor(props: ButtonProps & ButtonChildren) {
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

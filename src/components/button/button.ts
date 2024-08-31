import Block, { BlockProps } from '../../modules/block';

class Button extends Block {
  constructor(props: BlockProps<unknown>) {
    super({
      ...props,
      events: {
        click: props.submit as (e: unknown) => void,
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

import Block from '../../modules/block.ts';

class Input extends Block {
  constructor(props) {
    super(props);
  }

  render(): string {
    return `
      <input
        class="input__element"
        placeholder={{placeholder}}
      />  
    `
  }
}

export default Input;

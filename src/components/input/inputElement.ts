import Block from '../../modules/block.ts';

interface IInputElement {
  error: string;
  class: string;
  label: string;
  name: string;
  type: 'text' | 'submit';
}

class InputElement extends Block {
  constructor(props: IInputElement) {
    super(props);
  }

  render() {
    // console.log('input', this.props, 'render');

    return `
        <input class="viInput__input {{#if error}}viInput__input_error{{/if}} {{class}}"
          placeholder="{{label}}"
          name="{{name}}"
          type={{#if type}}{{type}}{{else}}"text"{{/if}}
          autocomplete="off"
          
          id={{name}}
        />
    `;
  }
}

export default InputElement;
// value="{{value}}"

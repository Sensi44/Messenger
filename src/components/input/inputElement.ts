import Block from '../../modules/block.ts';

class InputElement extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('input', this.props);

    return `
        <input class="viInput__input {{#if error}}viInput__input_error{{/if}}{{class}}"
          placeholder="{{label}}"
          name="{{name}}"
          type={{#if type}}{{type}}{{else}}"text"{{/if}}
          autocomplete="off"
          value="{{value}}"
          id={{name}}
        />
    `;
  }
}

export default InputElement;


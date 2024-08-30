import Block, { BlockProps } from '../../modules/block.ts';

class InputElement extends Block {
  constructor(props: BlockProps) {
    super(props);
  }

  render() {
    console.log('input', this.props, this._events);
    return `
        <input class="viInput__input {{#if error}}viInput__input_error{{/if}} {{class}}"
          placeholder="{{label}}"
          name="{{name}}"
          type={{#if type}}{{type}}{{else}}"text"{{/if}}
          autocomplete="off"
          {{#if dataName}}data-name={{dataName}}{{/if}}
          {{#if value}}value="{{value}}"{{/if}}
          {{#if id}}id="{{name}}"{{/if}}
        />
    `;
  }
}

export default InputElement;

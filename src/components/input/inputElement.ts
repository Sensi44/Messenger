import Block from '../../modules/block.ts';

import type { ITest } from './inputElement.props.ts';

class InputElement extends Block<ITest> {
  constructor(props: ITest) {
    super(props);
  }

  render() {
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

import Block from '../../modules/block.ts';

import type { IInputElement } from './inputElement.props.ts';

class InputElement extends Block<IInputElement> {
  constructor(props: IInputElement) {
    super(props);
  }

  render() {
    return `
        <input class="viInput__input {{#if error}}viInput__input_error{{/if}} {{class}}"
          placeholder="{{label}}"
          name="{{name}}"
          type={{#if type}}{{type}}{{else}}"text"{{/if}}
          autocomplete="off"
          data-name={{dataName}}

        />
    `;
  }
}

export default InputElement;
// value="{{value}}"
//           id={{name}}
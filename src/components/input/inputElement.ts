import Block from '../../modules/block.ts';

// import type { ITest } from './inputElement.props.ts';

type InputElementProps = {
  name: string;
  label: string;
  dataName?: string;
  value?: string;
  events?: {
    blur?: (e: FocusEvent) => void;
    input?: (e: InputEvent) => void;
  };
};

type InputElementChildren = {};

class InputElement extends Block<InputElementProps, InputElementChildren> {
  constructor(props: InputElementProps & InputElementChildren) {
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

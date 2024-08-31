import Block from '../../modules/block.ts';
import InputElement from './inputElement.ts';

// import type { IInput } from './inputElement.props.ts';

type InputProps = {
  blur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
  name: string;
  label: string;
  dataName: string;
  value?: string;
  type?: string;
};

type InputChildren = {
  input?: InputElement;
};

class Input extends Block<InputProps, InputChildren> {
  init() {
    this.children = {
      ...this.children,
      input: new InputElement({
        ...this.props,
        events: {
          blur: this.props.blur,
          input: this.props.onChange,
        },
      }),
    };
  }

  render() {
    return `
      <label class="viInput {{labelClass}} {{#if error}}viInput__input_error{{/if}}">
        {{{ input }}}
        {{#if label}}
          <span class="viInput__placeHolder text-m">{{label}}</span>
        {{/if}}
        
        {{#if error}}
          <span class="viInput__error text-xs">{{error}}</span>
        {{/if}}
      </label>
    `;
  }
}

export default Input;

import Block from '../../modules/block.ts';
import InputElement from './inputElement.ts';

class Input extends Block {
  init() {
    this.children = {
      ...this.children,
      input: new InputElement({
        ...this.props,
        events: {
          blur: this.props.blur as (e: MouseEvent) => void,
          input: this.props.onChange as (e: MouseEvent) => void,
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

import Block from '../../modules/block.ts';
import InputElement from './inputElement.ts';

import type { IInput } from './inputElement.props.ts';

class Input extends Block<IInput> {
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

  // componentDidUpdate(oldProps, newProps): boolean {
  //   if (oldProps !== newProps) {
  //     this.children.input.setProps(newProps);
  //     return true;
  //   }
  //   return false;
  // }

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

  // addEvents() {
  //   const { events = {} } = this.props;
  //
  //   Object.keys(events).forEach((eventName) => {
  //     const inputElement = this.getContent().querySelector('input[name="' + this.props.name + '"]');
  //     if (inputElement) {
  //       inputElement.addEventListener(eventName, events[eventName]);
  //     }
  //   });
  // }
  //
  // removeEvents() {
  //   const { events = {} } = this.props;
  //
  //   Object.keys(events).forEach((eventName) => {
  //     const inputElement = this.getContent().querySelector('input[name="' + this.props.name + '"]');
  //     if (inputElement) {
  //       inputElement.removeEventListener(eventName, events[eventName]);
  //     }
  //   });
  // }
}

export default Input;


import Block from '../../modules/block.ts';
import InputElement from './inputElement.ts';

class Input extends Block {
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

  componentDidUpdate(oldProps, newProps): boolean {
    if (oldProps !== newProps) {
      this.children.input.setProps(this.props);
      return true;
    }
    return false;
  }

  render() {
    // return `
    //   <label class="viInput {{labelClass}}">
    //     <input class="viInput__input {{#if error}}viInput__input_error{{/if}}{{class}}"
    //            placeholder="{{label}}"
    //            name="{{name}}"
    //            type={{#if type}}{{type}}{{else}}"text"{{/if}}
    //            autocomplete="off"
    //            value="{{value}}"
    //            id={{name}}
    //     />
    //
    //     ${this.props.label ? `<span class="viInput__placeHolder text-m">${this.props.label}</span>` : ''}
    //     ${this.props.error ? `<span class="viInput__error text-xs">${this.props.error}</span>` : ''}
    //   </label>
    // `

    return `
      <label class="viInput {{labelClass}}">
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

// <input class="viInput__input {{#if error}}viInput__input_error{{/if}}{{class}}"
// placeholder="{{label}}"
// name="{{name}}"
// type={{#if type}}{{type}}{{else}}"text"{{/if}}
//   autocomplete="off"
//   value="{{value}}"
//   id={{name}}
//   />

export default Input;

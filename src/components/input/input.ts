import Block from '../../modules/block.ts';

class Input extends Block {
  constructor(props) {
    super(props);
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
        <input class="viInput__input {{#if error}}viInput__input_error{{/if}}{{class}}"
               placeholder="{{label}}"
               name="{{name}}"
               type={{#if type}}{{type}}{{else}}"text"{{/if}}
               autocomplete="off"
               value="{{value}}"
               id={{name}}
        />
      
        ${this.props.label ? `<span class="viInput__placeHolder text-m">${this.props.label}</span>` : ''}
        ${this.props.error ? `<span class="viInput__error text-xs">${this.props.error}</span>` : ''}
      </label>
    `
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const inputElement = this.getContent().querySelector('input[name="' + this.props.name + '"]');
      if (inputElement) {
        inputElement.addEventListener(eventName, events[eventName]);
      }
    });
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const inputElement = this.getContent().querySelector('input[name="' + this.props.name + '"]');
      if (inputElement) {
        inputElement.removeEventListener(eventName, events[eventName]);
      }
    });
  }
}

export default Input;

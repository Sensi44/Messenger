import Block from '../../modules/block';

type ButtonProps = {
  type?: string;
  className?: string;
  label?: string;
  submit?: (e: MouseEvent) => void;
  events?: {
    click?: (e: MouseEvent) => void;
  };
  image?: string;
  buttonType?: string;
};
type ButtonChildren = {};

class Button extends Block<Partial<ButtonProps>, ButtonChildren> {
  constructor(props: Partial<ButtonProps> & ButtonChildren) {
    super({
      ...props,
      events: {
        click: props.submit,
      },
    });
  }

  render() {
    return `
        <button type="{{buttonType}}" class="button button__{{type}} {{className}}">
          {{label}}
          {{#if image}}
            <img src="https://ya-praktikum.tech/api/v2/resources{{image}}" alt="Аватар пользователя">
          {{/if}}
       </button>
    `;
  }
}

export default Button;

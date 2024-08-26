import Block from '../../modules/block';
import InputElement from '../input/inputElement.ts';

class FormBody extends Block {
  // todo удалить наверное, зря я его выдумал
  // вернее можно конечно с ним заморочиться, но если бы было больше времени

  constructor(props) {
    super({
      ...props,
      TestInput: new InputElement({ name: 'login',
        placeHolder: 'логин',
        error: {
          message: 'неверный логин',
        }})
    });
  }

  render() {
    console.log(this.props);
    return `
      <div>
        {{#each form as |data|}}
          {{> Input
            label=data.placeHolder
            name=data.name
            type=data.type
            error=data.error
          }}
        {{/each}}
        {{{ TestInput }}}
      </div>
    `;
  }
}

export default FormBody;

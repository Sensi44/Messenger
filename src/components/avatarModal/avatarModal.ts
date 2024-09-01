import Block from '../../modules/block';
import { Input, Button } from '../../components';

type AvatarModalProps = {
  submitError?: boolean;
};
type AvatarModalChildren = {
  avatarInput: Input;
  submitButton: Button;
};

class AvatarModal extends Block<AvatarModalProps, Partial<AvatarModalChildren>> {
  private selectedFile: File | null = null;

  init() {
    const onFileChangeBind = this.onFileChange.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const avatarInput = new Input({
      name: 'avatarModal__loadPhoto',
      label: 'Выбрать файл на компьютере',
      labelClass: 'avatarModal__customFile',
      id: 'avatarModal__loadPhoto',
      type: 'file',
      onChange: onFileChangeBind,
    });

    const submitButton = new Button({
      label: 'Сменить аватар',
      type: 'primary',
      submit: onSubmitButtonBind,
    });

    this.children = {
      ...this.children,
      avatarInput,
      submitButton,
    };
  }

  private onFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      console.log('Выбранный файл:', this.selectedFile);
      this.setProps({
        submitError: false,
      });
    }
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    if (this.selectedFile) {
      console.log(this.selectedFile);
    } else {
      this.setProps({
        submitError: true,
      });
    }
  }

  render() {
    return `
      <dialog class="viModal avatarModal {{isOpen}}">
        {{#Typography style="text-l"}}Файл загружен{{/Typography}}
        {{#Typography style="text-l"}}Загрузите файл{{/Typography}}
        {{#Typography style="text-l" className="avatarModal__error"}}Ошибка, попробуйте ещё раз{{/Typography}}
        
        <form class="avatarModal__form">
          <label for="avatarModal__loadPhoto" class="avatarModal__loadPhoto">
            Выбрать файл на компьютере
          </label>
          {{{avatarInput}}}
          
          {{{submitButton}}}
          {{#if submitError}}
            {{#Typography as="span" style="text-xs" className="avatarModal__error"}}Нужно выбрать файл{{/Typography}}
          {{/if}}
        </form>
      </dialog>
    `;
  }
}

export default AvatarModal;

import Block from '../../modules/block';
import { Input, Button } from '../../components';
import { changeProfileAvatar } from '../../services/profile.ts';

type AvatarModalProps = {
  submitError?: boolean;
  closeCallBack: () => void;
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
    const inputWithAvatar = document.getElementById('avatarModal__loadPhoto') as HTMLInputElement;

    if (inputWithAvatar.files && inputWithAvatar.files.length > 0) {
      const file = inputWithAvatar.files[0]; // Получаем файл
      const formData = new FormData();

      formData.append('avatar', file);
      console.log([...formData.entries()], 'FormData content'); // Лог для проверки
      changeProfileAvatar(formData).finally(() => {
        this.props.closeCallBack();
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
            {{#Typography as="span" style="text-xs" className="avatarModal__error"}}
              Нужно выбрать файл
            {{/Typography}}
          {{/if}}
        </form>
      </dialog>
    `;
  }
}

export default AvatarModal;

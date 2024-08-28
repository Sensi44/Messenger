import Block from '../../modules/block';
import { Input, Button } from '../../components';

class AvatarModal extends Block<object> {
  private selectedFile: File | null = null;

  init() {
    const onFileChangeBind = this.onFileChange.bind(this);
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
      this.selectedFile = target.files[0]; // Получаем выбранный файл
      console.log('Выбранный файл:', this.selectedFile);

      // Здесь можно добавить логику, например, валидацию файла
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
        </form>
        
        {{{submitButton}}}
        {{#Typography as="span" style="text-xs" className="avatarModal__error"}}Нужно выбрать файл{{/Typography}}
      </dialog>
    `;
  }
}

export default AvatarModal;

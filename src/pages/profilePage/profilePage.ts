import Block from '../../modules/block.ts';
import { Input, Link } from '../../components';

class ProfilePage extends Block<object> {
  init() {
    const backLink = new Link({
      url: 'nav',
      class: 'profilePage__back',
      text: '<--',
    });

    const avatarInput = new Input({
      name: 'file',
      type: 'file',
      labelClass: 'profilePage__customFile',
    });

    this.children = {
      ...this.children,
      backLink,
      avatarInput,
    };
  }

  render() {
    console.log('this.props', this.props);
    return `
      <main class="profilePage">
         {{{ backLink }}}
         
         <article class="profilePage__userDataContainer">
          {{{ avatarInput }}}
          
          {{#if edit}}{{else}}
            <p class="text-l profilePage__name">{{name}}</p>
          {{/if}}
          
          {{#if edit}}
            <form action="">
              {{#if (GetEditType edit editType)}}
                <div>компонент редактирования данных</div>
              {{else}}
              <div>редактирование пароля</div>
              {{/if}}
            </form>
            {{else}}
            <div>Просто вывод данных</div>
            <div>ссылки на изменения данных</div>
          {{/if}}
          
          
         </article>
         {{#if isOpen}}
           <div>Модалка редактирования аватарки</div>
         {{/if}}
      </main>
    `;
  }
}

export default ProfilePage;

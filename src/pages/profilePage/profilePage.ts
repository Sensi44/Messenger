import Block from '../../modules/block.ts';
import { Input, Link, Button, EditPasswordForm, EditDataForm } from '../../components';
import { profileContext } from './profileContext.ts';

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

    // const avatarButton = new Button({
    //   name: 'file',
    //   type: 'file',
    //   labelClass: 'profilePage__customFile',
    // });

    const editPasswordForm = new EditPasswordForm({});
    const editDataForm = new EditDataForm({});

    this.children = {
      ...this.children,
      backLink,
      avatarInput,
      editPasswordForm,
      editDataForm,
    };

    this.props = {
      ...this.props,
      userData: profileContext,
    };
  }

  render() {
    return `
      <main class="profilePage">
         {{{ backLink }}}
         
         <article class="profilePage__userDataContainer">
          {{{ avatarInput }}}
          
          {{#if edit}}{{else}}
            <p class="text-l profilePage__name">{{name}}</p>
          {{/if}}
          
          {{#if edit}}
            <form class="profilePage__editForm">
              {{#if (GetEditType edit editType)}}
                {{{ editDataForm }}}
              {{else}}
                {{{ editPasswordForm }}}
              {{/if}}
            </form>
          {{else}}
            <div class="profilePage__userData">
              {{#each userData as |data|}}
                <p class="profilePage__userDataElement">
                  <span>{{data.placeHolder}}</span>
                  <span>{{data.value}}</span>
                </p>
              {{/each}}
            </div>
            <div class="profilePage__userActions">
              <a href="#" data-page="profileEditData" class="profilePage__userAction">Изменить данные</a>
              <a href="#" data-page="profileEditPassword" class="profilePage__userAction">Изменить пароль</a>
              <a href="#" data-page="nav" class="profilePage__userAction profilePage__userAction_red">Выйти</a>
            </div>
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

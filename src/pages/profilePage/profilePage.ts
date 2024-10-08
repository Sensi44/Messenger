import Block from '../../modules/block.ts';
import { Link, Button, EditPasswordForm, EditDataForm, AvatarModal } from '../../components';
import { profileContext } from './profileContext.ts';

type ProfilePageProps = {
  name: string;
  userData?: {
    name: string;
    placeHolder: string;
    value: string;
    type?: string;
  }[];
  isOpen?: boolean;
};
type ProfilePageChildren = {
  backLink: Link;
  avatarButton: Button;
  avatarModal: AvatarModal;
  editPasswordForm: EditPasswordForm;
  editDataForm: EditDataForm;
};

class ProfilePage extends Block<Partial<ProfilePageProps>, Partial<ProfilePageChildren>> {
  constructor(props: Partial<ProfilePageProps> & Partial<ProfilePageChildren>) {
    super(props);
  }

  init() {
    const openAvatarEditModalBind = this.openAvatarEditModal.bind(this);
    const backLink = new Link({
      url: 'nav',
      class: 'profilePage__back',
      text: '<--',
    });

    const avatarButton = new Button({
      type: 'file',
      className: 'profilePage__customFile',
      submit: openAvatarEditModalBind,
    });
    const avatarModal = new AvatarModal({});
    const editPasswordForm = new EditPasswordForm({});
    const editDataForm = new EditDataForm({});

    this.children = {
      ...this.children,
      backLink,
      avatarButton,
      avatarModal,
      editPasswordForm,
      editDataForm,
    };

    this.props = {
      ...this.props,
      userData: profileContext,
    };
  }

  openAvatarEditModal() {
    this.setProps({
      isOpen: true,
    });
  }

  render() {
    return `
      <main class="profilePage">
         {{{ backLink }}}
         
         <article class="profilePage__userDataContainer">
          {{{ avatarButton }}}
          
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
           {{{ avatarModal }}}
         {{/if}}
      </main>
    `;
  }
}

export default ProfilePage;

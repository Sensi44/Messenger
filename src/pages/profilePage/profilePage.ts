import Block from '../../modules/block.ts';
import { connect } from '../../modules/store/connect.ts';
import { logout } from '../../services/auth.ts';

import { Link, Button, EditPasswordForm, EditDataForm, AvatarModal } from '../../components';
import { profileContext } from './profileContext.ts';

import isEqual from '../../utils/isEqual.ts';

import type { StoreState } from '../../modules/store/store.types.ts';
import type { TUser } from '../../types/commonTypes.ts';

type ProfilePageProps = {
  userData: {
    name: string;
    placeHolder: string;
    value: string | number;
    type?: string;
  }[];
  user: TUser | null;
  isOpen?: boolean;
  isAuthorized: boolean | null;
  edit?: boolean;
  editType?: string;
  isLoading: boolean;
};
type ProfilePageChildren = {
  backLink: Link;
  avatarButton: Button;
  avatarModal: AvatarModal;
  editPasswordForm: EditPasswordForm;
  editDataForm: EditDataForm;
  changeData: Link;
  changePassword: Link;
  exit: Link;
};

class ProfilePage extends Block<Partial<ProfilePageProps>, Partial<ProfilePageChildren>> {
  init() {
    console.log(this.props, ' init');
    const pathName = window.location.pathname;
    let newProps = {};
    switch (pathName) {
      case '/profileEditData':
        newProps = { edit: true, editType: 'data' };
        break;
      case '/profileEditPassword':
        newProps = { edit: true, editType: 'password' };
        break;
      case '/profileEditAvatar':
        newProps = { isOpen: 'open' };
        break;
      default:
        break;
    }

    const openAvatarEditModalBind = this.openAvatarEditModal.bind(this);
    const closeAvatarEditModalBind = this.closeAvatarEditModal.bind(this);
    const logoutBing = this.handleLogout.bind(this);
    const backLink = new Link({
      url: '/',
      class: 'profilePage__back',
      text: '<--',
    });

    const avatarButton = new Button({
      type: 'file',
      className: 'profilePage__customFile',
      submit: openAvatarEditModalBind,
      image: this.props.user?.avatar || '',
    });
    const avatarModal = new AvatarModal({ closeCallBack: closeAvatarEditModalBind });
    const editPasswordForm = new EditPasswordForm({});
    const editDataForm = new EditDataForm({ user: this.props.user });
    const changeData = new Link({
      url: '/settingsEditData',
      class: 'profilePage__userAction',
      dataAttr: 'profileEditData',
      text: 'Изменить данные',
    });
    const changePassword = new Link({
      url: '/settingsEditPassword',
      class: 'profilePage__userAction',
      dataAttr: 'profileEditPassword',
      text: 'Изменить пароль',
    });
    const exit = new Button({
      label: 'Выйти',
      type: 'logout',
      className: 'profilePage__userAction profilePage__userAction_red',
      submit: logoutBing,
    });

    this.children = {
      ...this.children,
      backLink,
      avatarButton,
      avatarModal,
      editPasswordForm,
      editDataForm,
      changeData,
      changePassword,
      exit,
    };

    this.setProps({
      ...this.props,
      ...newProps,
    });
  }

  componentDidMount() {
    if (this.props.isAuthorized === false) {
      window.router?.go('/');
      return true;
    }
  }

  componentDidUpdate(oldProps: Partial<ProfilePageProps>, newProps: Partial<ProfilePageProps>): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      this.children.editDataForm?.setProps({
        ...oldProps,
        isLoading: newProps.isLoading,
      });
      this.children.editPasswordForm?.setProps({
        ...oldProps,
        isLoading: newProps.isLoading,
      });
      this.children.avatarButton?.setProps({
        ...oldProps,
        image: newProps.user?.avatar || '',
      });
    }

    if (!isEqual(oldProps, newProps)) {
      this.setProps(newProps);
      this.children.editDataForm?.setProps({
        user: newProps.user,
      });
      this.children.avatarButton?.setProps({
        image: newProps.user?.avatar || '',
      });
      return true;
    }
    return false;
  }

  openAvatarEditModal() {
    console.log('?');
    this.setProps({
      ...this.props,
      isOpen: true,
    });
  }

  closeAvatarEditModal() {
    this.setProps({
      ...this.props,
      isOpen: false,
    });
  }

  async handleLogout() {
    await logout().catch((err) => {
      console.error(err);
    });
  }

  render() {
    console.log('ProfilePage - props: ', this.props);
    return `
      <main class="profilePage">
         {{{ backLink }}}
         
         <article class="profilePage__userDataContainer">
          {{{ avatarButton }}}
          
          {{#if edit}}{{else}}
            <p class="text-l profilePage__name">{{user.firstName}}</p>
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
              {{{changeData}}}
              {{{changePassword}}}
              {{{exit}}}
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

const mapStateToProps = (state: StoreState): ProfilePageProps => {
  const newUserData = profileContext.map((fieldObject) => {
    return {
      ...fieldObject,
      value: `${state.user?.[fieldObject.valueName] || ''}`,
    };
  });

  const user = state.user;
  const isAuthorized = state.isAuthorized;
  const isLoading = state.isLoading;
  const userData = newUserData || [];

  return {
    user,
    isAuthorized,
    isLoading,
    userData,
  };
};

export default connect(mapStateToProps)(ProfilePage);

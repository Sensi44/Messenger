import Block from '../../modules/block.ts';
import { connect } from '../../modules/store/connect.ts';

import { Link, Button, EditPasswordForm, EditDataForm, AvatarModal } from '../../components';
import { profileContext } from './profileContext.ts';

import isEqual from '../../utils/isEqual.ts';

import type { StoreState } from '../../modules/store/store.types.ts';
import type { TUser } from '../../types/commonTypes.ts';

export interface ProfileField {
  name: string;
  valueName: string;
  value: string;
  placeHolder: string;
  type?: string; // Необязательно
}

export type ProfileFieldsObject = {
  [key: number]: ProfileField; // Индексная сигнатура
};

type ProfilePageProps = {
  name: string;
  userData: {
    name: string;
    placeHolder: string;
    value: string | number;
    type?: string;
  }[];
  user: TUser | null;
  isOpen?: boolean;
  isAuthorized: boolean;
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
    // if (!this.props.isAuthorized) {
    //   window.router.go('/');
    // }

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

    console.log('init', this.props);
    const openAvatarEditModalBind = this.openAvatarEditModal.bind(this);
    const backLink = new Link({
      url: '/',
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
    const changeData = new Link({
      url: '/profileEditData',
      class: 'profilePage__userAction',
      dataAttr: 'profileEditData',
      text: 'Изменить данные',
    });
    const changePassword = new Link({
      url: '/profileEditPassword',
      class: 'profilePage__userAction',
      dataAttr: 'profileEditPassword',
      text: 'Изменить пароль',
    });
    const exit = new Link({
      url: '/',
      class: 'profilePage__userAction profilePage__userAction_red',
      text: 'Выйти',
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
    if (!this.props.isAuthorized) {
      window.router?.go('/');
    }
  }

  componentDidUpdate(oldProps: Partial<ProfilePageProps>, newProps: Partial<ProfilePageProps>): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.setProps(newProps);
      return true;
    }
    return false;
  }

  openAvatarEditModal() {
    this.setProps({
      ...this.props,
      isOpen: true,
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
  console.log('state mapStateToProps - ', state);

  // const newUserData = profileContext.reduce(
  //   (acc, field, index) => {
  //     acc[index + 1] = { ...field, value: `${state.user?.[field.valueName || '']}` };
  //     return acc;
  //   },
  //   {} as Record<number, (typeof profileContext)[0] & { value: string | undefined }>
  // );

  const newUserData = profileContext.map((fieldObject) => {
    return {
      ...fieldObject,
      value: `${state.user?.[fieldObject.valueName] || ''}`,
    };
  });

  const name = state.user?.firstName ? state.user?.firstName : '';
  const user = state.user;
  const isAuthorized = state.isAuthorized;
  const userData = newUserData || [];

  return {
    name,
    user,
    isAuthorized,
    userData,
  };
};

export default connect(mapStateToProps)(ProfilePage);

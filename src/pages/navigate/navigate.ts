import Block from '../../modules/block.ts';
import { Link } from '../../components';

type NavProps = {};
type NavChildren = {
  LoginPageLink: Link;
  SignInPageLink: Link;
  ProfilePageLink: Link;
  ProfilePageEditDataLink: Link;
  ProfilePageEditPasswordLink: Link;
  ProfilePageEditAvatarLink: Link;
  ServerErrorPageLink: Link;
  NotFoundErrorPageLink: Link;
};

class NavigatePage extends Block<NavProps, NavChildren> {
  init() {
    const LoginPageLink = new Link({
      url: '/loginPage',
      class: 'navigatePage__element',
      text: 'Авторизация',
    });

    const SignInPageLink = new Link({
      url: '/signInPage',
      class: 'navigatePage__element',
      text: 'Регистрация',
    });

    const ProfilePageLink = new Link({
      url: '/profilePage',
      class: 'navigatePage__element',
      text: 'Профиль',
    });

    const ProfilePageEditDataLink = new Link({
      url: '/profileEditData',
      class: 'navigatePage__element',
      text: 'Профиль - изменить данные',
    });

    const ProfilePageEditPasswordLink = new Link({
      url: '/profileEditPassword',
      class: 'navigatePage__element',
      text: 'Профиль - изменить пароль',
    });

    const ProfilePageEditAvatarLink = new Link({
      url: '/profileEditAvatar',
      class: 'navigatePage__element',
      text: 'Профиль - изменить аватар',
    });

    const ServerErrorPageLink = new Link({
      url: '/404',
      class: 'navigatePage__element',
      text: '404',
    });

    const NotFoundErrorPageLink = new Link({
      url: '/500',
      class: 'navigatePage__element',
      text: '500',
    });

    this.children = {
      ...this.children,
      LoginPageLink,
      SignInPageLink,
      ProfilePageLink,
      ProfilePageEditDataLink,
      ProfilePageEditPasswordLink,
      ProfilePageEditAvatarLink,
      ServerErrorPageLink,
      NotFoundErrorPageLink,
    };
  }

  render() {
    return `
      <main class="navigatePage basePage">
        <h1>Данная страница пока что остаётся для удобства разработки</h1>
        <nav>
          <ol class="navigatePage__list">
            <li class="navigatePage__element">{{{ LoginPageLink }}}</li>
            <li class="navigatePage__element">{{{ SignInPageLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageEditDataLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageEditPasswordLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageEditAvatarLink }}}</li>
            <br />
            <li class="navigatePage__element"><a href="#" data-page="messengerPage">Страница мессенджера (обновить нав)</a></li>
            <li class="navigatePage__element"><a href="#" data-page="messengerPageWithModal">Добавить удалить пользователя (обновить нав)</a></li>
            <br />
            <li class="navigatePage__element">{{{ ServerErrorPageLink }}}</li>
            <li class="navigatePage__element">{{{ NotFoundErrorPageLink }}}</li>
          </ol>
        </nav>
      </main>
    `;
  }
}

export default NavigatePage;

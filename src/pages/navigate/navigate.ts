import Block from '../../modules/block.ts';
import { Link } from '../../components';

type NavProps = {};
type NavChildren = {
  LoginPageLink: Link;
  SignInPageLink: Link;
  ProfilePageLink: Link;
  ProfilePageEditDataLink: Link;
  ProfilePageEditPasswordLink: Link;
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

    this.children = {
      ...this.children,
      LoginPageLink,
      SignInPageLink,
      ProfilePageLink,
      ProfilePageEditDataLink,
      ProfilePageEditPasswordLink,
    };
  }

  render() {
    return `
      <main class="navigatePage basePage">
        <nav>
          <ol class="navigatePage__list">
            <li class="navigatePage__element">{{{ LoginPageLink }}}</li>
            <li class="navigatePage__element">{{{ SignInPageLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageEditDataLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageEditPasswordLink }}}</li>
            <li class="navigatePage__element"><a href="#" data-page="profileWithAvatarModal">Загрузить новый аватар+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="messengerPage">Страница мессенджера</a></li>
            <li class="navigatePage__element"><a href="#" data-page="messengerPageWithModal">Добавить удалить пользователя</a></li>
            <li class="navigatePage__element"><a href="#" data-page="notFound">404+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="serverError">500+</a></li>
          </ol>
        </nav>
      </main>
    `;
  }
}

export default NavigatePage;

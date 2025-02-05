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
  MessengerPageLink: Link;
  MessengerPageModalLink: Link;
  TestErrorPage: Link;
};

class NavigatePage extends Block<NavProps, NavChildren> {
  init() {
    const LoginPageLink = new Link({
      url: '/loginPage',
      class: 'navigatePage__element',
      text: 'Авторизация',
    });

    const SignInPageLink = new Link({
      url: '/sign-up',
      class: 'navigatePage__element',
      text: 'Регистрация',
    });

    const ProfilePageLink = new Link({
      url: '/settings',
      class: 'navigatePage__element',
      text: 'Профиль',
    });

    const ProfilePageEditDataLink = new Link({
      url: '/settingsEditData',
      class: 'navigatePage__element',
      text: 'Профиль - изменить данные',
    });

    const ProfilePageEditPasswordLink = new Link({
      url: '/settingsEditPassword',
      class: 'navigatePage__element',
      text: 'Профиль - изменить пароль',
    });

    // const ProfilePageEditAvatarLink = new Link({
    //   url: '/profileEditAvatar',
    //   class: 'navigatePage__element',
    //   text: 'Профиль - изменить аватар',
    // });

    const MessengerPageLink = new Link({
      url: '/messenger',
      class: 'navigatePage__element',
      text: 'Страница мессенджера',
    });

    const MessengerPageModalLink = new Link({
      url: '/messengerPageModal',
      class: 'navigatePage__element',
      text: 'Добавить удалить пользователя',
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

    const TestErrorPage = new Link({
      url: '/trashLinkForError',
      class: 'navigatePage__element',
      text: 'фейковая ссылка на некорректный URL',
    });

    this.children = {
      ...this.children,
      LoginPageLink,
      SignInPageLink,
      ProfilePageLink,
      ProfilePageEditDataLink,
      ProfilePageEditPasswordLink,
      // ProfilePageEditAvatarLink,
      MessengerPageLink,
      MessengerPageModalLink,
      ServerErrorPageLink,
      NotFoundErrorPageLink,
      TestErrorPage,
    };
  }

  render() {
    return `
      <main class="navigatePage basePage">
        <h1>Данная страница пока что остаётся для удобства разработки</h1>
        <h2>Если это критично, я переделаю на ожидаемое поведение: вход | регистрация -> страница мессенджера</h2>
        <h3>Есть желание после курса отполировать UI, поэтому пока оставил так </h3>
        <nav>
          <ol class="navigatePage__list">
            <li class="navigatePage__element">{{{ LoginPageLink }}}</li>
            <li class="navigatePage__element">{{{ SignInPageLink }}}</li>
            <li class="navigatePage__element">{{{ ProfilePageLink }}}</li>
<!--            <li class="navigatePage__element">{{{ ProfilePageEditDataLink }}}</li>-->
<!--            <li class="navigatePage__element">{{{ ProfilePageEditPasswordLink }}}</li>-->
<!--            <li class="navigatePage__element">{{{ ProfilePageEditAvatarLink }}}</li>-->
            <br />
            <li class="navigatePage__element">{{{ MessengerPageLink }}}</li>
<!--            <li class="navigatePage__element">{{{ MessengerPageModalLink }}}</li>-->
            <br />
            <li class="navigatePage__element">{{{ ServerErrorPageLink }}}</li>
            <li class="navigatePage__element">{{{ NotFoundErrorPageLink }}}</li>
<!--            <li class="navigatePage__element">{{{ TestErrorPage }}}</li>-->
          </ol>
        </nav>
      </main>
    `;
  }
}

export default NavigatePage;

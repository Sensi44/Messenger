import Block from '../../modules/block.ts';

class NavigatePage extends Block<object> {
  render() {
    return `
      <main class="navigatePage basePage">
        <nav>
          <ol class="navigatePage__list">
            <li class="navigatePage__element"><a href="#" data-page="loginPage">Авторизация+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="signInPage">Регистрация+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="profile">Профиль+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="profileEditData">Изменить данные+</a></li>
            <li class="navigatePage__element"><a href="#" data-page="profileEditPassword">Изменить пароль+</a></li>
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

import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';

import type { StoreState } from '../../modules/store/store.types.ts';

type LoginPageProps = {
  isLoading: boolean;
};
type LoginPageChildren = {
  FormLogin: LoginForm;
};

class LoginPage extends Block<LoginPageProps, Partial<LoginPageChildren>> {
  init() {
    const FormLogin = new LoginForm({ name: 'Вход' });

    this.children = {
      ...this.children,
      FormLogin,
    };
  }

  render() {
    // console.log(this.props);
    return `
      <main class="loginPage basePage vertical">
        {{#if isLoading}}
          <h2>Загрузка...</h2>
        {{else}}
          {{{ FormLogin }}}
        {{/if}}
      </main>
    `;
  }
}

// const mapStateToProps = ({ isLoading }) => ({ isLoading });
const mapStateToProps = (state: StoreState): LoginPageProps => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(LoginPage);

import { LoginForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import { login, getUser } from '../../services/auth.ts';

import Block from '../../modules/block.ts';

import type { StoreState } from '../../modules/store/store.types.ts';

type LoginPageProps = {
  isLoading: boolean;
  loginError: null | string;
  user: any;
  isAuthorized: boolean;
};
type LoginPageChildren = {
  FormLogin: LoginForm;
};

class LoginPage extends Block<LoginPageProps, Partial<LoginPageChildren>> {
  init() {
    const FormLogin = new LoginForm({ name: 'Вход', onSubmit: login, isLoading: false });

    this.children = {
      ...this.children,
      FormLogin,
    };
  }

  componentDidMount() {
    if (this.props.isAuthorized) {
      window.router.go('/');
    }
  }

  componentDidUpdate(oldProps: LoginPageProps, newProps: LoginPageProps): boolean {
    if (oldProps['isLoading'] !== newProps['isLoading']) {
      this.children.FormLogin?.setProps({
        isLoading: newProps.isLoading,
      });
      return true;
    }
    return false;
  }

  render() {
    console.log(this.props, 111);
    return `
      <main class="loginPage basePage vertical">
        {{{ FormLogin }}}
      </main>
    `;
  }
}

const mapStateToProps = (state: StoreState): LoginPageProps => ({
  isLoading: state.isLoading,
  loginError: state.loginError,
  user: state.user,
  isAuthorized: state.isAuthorized,
});

export default connect(mapStateToProps)(LoginPage);

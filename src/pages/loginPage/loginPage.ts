import { LoginForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import { login } from '../../services/auth.ts';

import Block from '../../modules/block.ts';

import type { StoreState } from '../../modules/store/store.types.ts';
import type { TUser } from '../../types/commonTypes.ts';

type LoginPageProps = {
  isLoading: boolean;
  error: null | string;
  user: TUser | null;
  isAuthorized: boolean | null;
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
    if (oldProps !== newProps) {
      this.children.FormLogin?.setProps({
        isLoading: newProps.isLoading,
      });
      return true;
    }
    return false;
  }

  render() {
    console.log('LoginPage', this.props, 111);
    return `
      <main class="loginPage basePage vertical">
        {{{ FormLogin }}}
      </main>
    `;
  }
}

const mapStateToProps = (state: StoreState): LoginPageProps => ({
  isLoading: state.isLoading,
  error: state.error,
  user: state.user,
  isAuthorized: state.isAuthorized,
});

export default connect(mapStateToProps)(LoginPage);

import Block from '../../modules/block.ts';
import { SignInForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import type { StoreState } from '../../modules/store/store.types.ts';

type SignInPageProps = {
  isAuthorized: boolean | null;
};
type SignInPageChildren = {
  FormSignIn: SignInForm;
};

class SignInPage extends Block<SignInPageProps, SignInPageChildren> {
  init() {
    const FormSignIn = new SignInForm({
      name: 'Регистрация',
    });

    this.children = {
      ...this.children,
      FormSignIn,
    };
  }

  componentDidMount() {
    if (this.props.isAuthorized) {
      window.router.go('/messenger');
    }
  }

  componentDidUpdate(): boolean {
    if (this.props.isAuthorized) {
      window.router.go('/messenger');
    }

    return true;
  }

  render() {
    return `
      <main class="loginPage basePage vertical">
         {{{ FormSignIn }}}
      </main>
    `;
  }
}

const mapStateToProps = (state: StoreState): SignInPageProps => ({
  isAuthorized: state.isAuthorized,
});

export default connect(mapStateToProps)(SignInPage);

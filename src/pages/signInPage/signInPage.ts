import Block from '../../modules/block.ts';
import { SignInForm } from '../../components';

type SignInPageProps = {};
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
    // console.log('did mount signIn page');
  }

  render() {
    return `
      <main class="loginPage basePage vertical">
         {{{ FormSignIn }}}
      </main>
    `;
  }
}

export default SignInPage;

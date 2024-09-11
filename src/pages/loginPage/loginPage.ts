import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';

type LoginPageProps = {};
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
    console.log(this.props);
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

const mapStateToProps = ({ isLoading, loginError }) => ({ isLoading, loginError });

export default connect(mapStateToProps)(LoginPage);

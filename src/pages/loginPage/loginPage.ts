import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';
import { connect } from '../../modules/store/connect.ts';

type LoginPageProps = {
  isLoading: boolean;
};
type LoginPageChildren = {
  FormLogin: LoginForm;
};

type StateProps = {
  isLoading: boolean;
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
const mapStateToProps = (state: StateProps): StateProps => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(LoginPage);

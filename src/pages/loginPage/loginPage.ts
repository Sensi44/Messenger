import Block from '../../modules/block.ts';
import LoginPageHbs from './loginPage.hbs?raw';
// import { compile } from '../../modules/compile.ts';

class LoginPage extends Block {
  props;

  constructor(props) {
    super('article', { ...props, withInternalID: true });
    this.props = props;
  }

  render() {
    return this.compile(LoginPageHbs as string, this.props);
  }
}

export default LoginPage;

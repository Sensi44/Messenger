import Block from '../../modules/block.ts';

// import { compile } from '../../modules/compile.ts';
import LoginPageHbs from './loginPage.hbs?raw';

class LoginPage extends Block {
  props;

  constructor(props) {
    super('div', props);
    this.props = props;
  }

  render() {
    return this.compile(LoginPageHbs as string, this.props);
  }
}

export default LoginPage;

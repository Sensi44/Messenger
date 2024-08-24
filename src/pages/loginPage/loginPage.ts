import Block from '../../modules/block.ts';

// import { compile } from '../../modules/compile.ts';
import LoginPageHbs from './loginPage.hbs?raw';

class LoginPage extends Block {
  props;

  constructor(props) {
    super('article', { ...props, withInternalID: true });
    this.props = props;
  }

  render() {
    const { __id } = this.props;
    console.log('uuid:', __id);

    return this.compile(LoginPageHbs as string, this.props);
  }
}

export default LoginPage;

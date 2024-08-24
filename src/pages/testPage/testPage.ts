import Block from '../../modules/block.ts';
import TestPageHbs from './testPage.hbs?raw';
import { Button } from '../../components';

class TestPage extends Block {
  props;

  constructor(props) {
    super('article', { ...props, withInternalID: true });
    this.props = props;
  }

  render() {
    return this.compile(TestPageHbs as string, { userName: this.props.userName });
  }
}

const testPage = new TestPage({
  userName: 'John Doe',
  button: new Button({ type: 'text', label: 'Тестовая Кнопка' }),
});

export default testPage;

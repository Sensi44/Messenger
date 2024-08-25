import Block from '../../modules/block.ts';
import TestPageHbs from './testPage.hbs?raw';
import { Button } from '../../components';

class TestPage extends Block {
  props;
  constructor(props) {
    super('article', { ...props, withInternalID: true });
    this.props = props;
  }

  // componentDidMount(oldProps) {
  //   console.log('a', 'componentDidMountcomponentDidMount');
  //   super.componentDidMount(oldProps);
  // }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.label !== newProps.label) {
      this.children.button.setProps({ label: newProps.label });
    }

    return true;
  }

  render() {
    this.children.button = new Button({
      label: this.props.label,
    });

    return this.compile(TestPageHbs as string, {
      userName: this.props.userName,
      // button: this.button,
    });
  }
}

// const btn = new Button({ type: 'submit', label: 'Тестовая Кнопка12' });

const testPage = new TestPage({
  userName: 'John Doe',
  // button: btn,
  label: 'Тестовая Кнопка',
});

// setTimeout(() => {
//   testPage.setProps({
//     userName: 'Сменили кнопку',
//     label: 'Кнопка обновлена',
//   });
// }, 2000);

export default testPage;

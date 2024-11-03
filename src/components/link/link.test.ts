import { expect } from 'chai';
import Link from './link.ts';

describe('Тесты компонента ссылки', () => {
  let clicked = false;

  it('Проверка кликабельности', () => {
    const TestLink = new Link({
      url: '/test',
      class: '123',
      text: 'Ссылка',
      events: {
        click: () => {
          clicked = true;
        },
      },
    });

    const element = TestLink.getContent() as HTMLButtonElement;
    element.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    expect(clicked).to.equal(true);
  });
});

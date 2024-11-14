import { expect } from 'chai';
import Block from './block.ts';
import Sinon from 'sinon';

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

type Refs = {};

describe('Block test suite', () => {
  let PageClass: typeof Block<Props, Refs>;

  beforeEach(() => {
    class Page extends Block<Props, Refs> {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      render(): string {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageClass = Page;
  });

  afterEach(() => {
    const element = document.querySelector('#test-element');
    if (element) {
      element.remove();
    }

    Sinon.restore();
  });

  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = 'Hello';
    const pageComponent = new PageClass({ text });

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('Компонент имеет реактивность за счёт получения новых пропсов', () => {
    const text = 'new value';
    const pageComponent = new PageClass({ text: 'Hello' });

    pageComponent.setProps({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('Компонент должен установить события на элемент', () => {
    const handlerStub = Sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.called).to.equal(true);
  });

  it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
    const clock = Sinon.useFakeTimers();
    const pageComponent = new PageClass({});

    const spyCDM = Sinon.spy(pageComponent, 'componentDidMount');

    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();

    expect(spyCDM.called).to.equal(true);
  });
});

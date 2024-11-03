import Router from './router.ts';
import Route from './route';
import { expect } from 'chai';
import 'jsdom-global/register';
import Block from '../block.ts';

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

type Refs = {};

describe('test router suite', () => {
  let router: Router;
  let PageClass: typeof Block<Props, Refs>;

  beforeEach(() => {
    router = new Router('#app');

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

  it('Добавление раутов', () => {
    const route = new Route(
      '/test',
      // @ts-ignore
      PageClass,
      { rootQuery: '#app' }
    );

    router.use('/test', route as any);
    expect(router['routes'].length).to.equal(1);
  });
});

import Route from './route';
import { expect } from 'chai';
import 'jsdom-global/register';
import Block from '../block.ts';

describe('test route suite', () => {
  let route: Route;

  beforeEach(() => {
    class Test extends Block {
      constructor() {
        super({});
        // @ts-ignore
        this.element = document.createElement('div');
        this.element.textContent = 'Test Block';
      }

      getContent() {
        return this.element;
      }
    }

    route = new Route('/test', Test as any, { rootQuery: 'app' });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Проверка корректности раута', () => {
    const result = route.match('/test');
    expect(result).to.equal(true);
  });
});

import EventBus from './eventBus/eventBus.ts';
import { EventEnum } from './eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers';

export type ComponentChildren = {
  [key: string]: Block<object> | Block<object>[];
};
export type BlockProps = object;

type TEvents = Values<typeof Block.EVENTS>;

class Block<Props = BlockProps, Children extends ComponentChildren = {}> {
  static EVENTS: Record<EventEnum, EventEnum> = {
    [EventEnum.INIT]: EventEnum.INIT,
    [EventEnum.FLOW_CDM]: EventEnum.FLOW_CDM,
    [EventEnum.FLOW_CDU]: EventEnum.FLOW_CDU,
    [EventEnum.FLOW_UNM]: EventEnum.FLOW_UNM,
    [EventEnum.FLOW_RENDER]: EventEnum.FLOW_RENDER,
  } as const;

  public props: Props;
  public children: Children;
  readonly eventBus: () => EventBus;
  // readonly #meta: { tagName: string };
  #element: HTMLElement | null = null;
  readonly #id = uuid();
  #needUpdate = true;

  constructor(propsWithChildren: Partial<Props & Children>) {
    const eventBus = new EventBus<TEvents>();
    const { props, children } = this.#getChildrenAndProps(propsWithChildren);

    this.props = this.#makePropsProxy(props) as Props;
    this.children = children as Children;

    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);

    // this.#meta = {
    //   tagName,
    // };
    // this.#id = uuid();

    // if (props?.withInternalID) {
    //   props._id = this.#id;
    // }
    // this.children = <Record<string, Block>>this.#makePropsProxy(children);
    eventBus.emit(Block.EVENTS[EventEnum.INIT]);
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS[EventEnum.INIT], this.#init.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_CDM], this.#componentDidMount.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_CDU], this.#componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_RENDER], this.#render.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_UNM], this.#componentUnMount.bind(this));
  }

  _createResources() {
    // const { tagName } = this.#meta;
    // this.#element = this.#createDocumentElement(tagName);
  }

  /** Методы жизненного цикла компонента */

  #init() {
    this.init();
    // this._createResources();
    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_RENDER]);
  }

  init() {}

  #render() {
    const propsAndStubs: Props = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        (propsAndStubs as { [key: string]: unknown })[key] = child.map(
          (component) => `<div data-id="${component.#id}"></div>`
        );
      } else {
        (propsAndStubs as { [key: string]: unknown })[key] = `<div data-id="${child.#id}"></div>`;
      }
    });

    const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component.#id}"]`);
          const content = component.getContent();
          if (content) {
            stub?.replaceWith(content);
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
        const content = child.getContent();
        if (content) {
          stub?.replaceWith(content);
        }
      }
    });
    if (this.#element && newElement) {
      this.#element.replaceWith(newElement);
    }

    this.#element = newElement;
    // this.#addEvents();
  }

  render() {
    // return document.createElement('div');
    // + Переопределяется пользователем. Необходимо вернуть разметку +
    // так как он изменяемый снаружи, мы к нему обращаемся в #render
  }

  /** пока не реализовано */
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDM]);

    // if (Object.keys(this.children).length) {
    //   this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_RENDER]);
    // }
  }

  #componentDidMount() {
    // if (this.element?.classList.contains('loginPage')) {
    //   console.log('componentDidMount:', 'loginForm');
    // }
    // if (this.element?.classList.contains('signInPage')) {
    //   console.log('componentDidMount:', 'signInPage');
    // }
    this.#addEvents();

    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((subChild) => {
          subChild.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
      // child.dispatchComponentDidMount();
    });
  }
  componentDidMount() {}

  #componentDidUpdate(oldProps: Props, newProps: Props) {
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (!needRerender) {
      return;
    }

    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_RENDER]);
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    for (const propKey in newProps) {
      if (oldProps[propKey] !== newProps[propKey]) {
        return true;
      }
    }
    return false;
  }

  #componentUnMount() {
    this.#removeEvents();

    this.componentUnMount()

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((subChild) => {
          (subChild as Block).#componentUnMount();
        });
      } else {
        (child as Block).#componentUnMount();
      }
    });
  }

  componentUnMount() {}

  setProps = (nextProps: Partial<Props & Children>) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props as object, nextProps);
    // this.#removeEvents();
    if (this.#needUpdate) {
      // this.#removeEvents();
      this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDU], oldProps, this.props);
      this.#needUpdate = false;
    }
  };

  #addEvents() {
    this.addEvents();
  }

  addEvents() {
    // console.log('add events');
    const { events = {} } = this.props as Props & {
      events: { [key: string]: () => void };
    };

    Object.keys(events).forEach((eventName) => {
      this.#element!.addEventListener(eventName, events[eventName]);
    });
  }

  #removeEvents() {
    this.removeEvents();
  }

  removeEvents() {
    // console.log('remove events');
    const { events = {} } = this.props as Props & {
      events: { [key: string]: () => void };
    };

    Object.keys(events).forEach((eventName) => {
      this.#element!.removeEventListener(eventName, events[eventName]);
    });
  }

  #getChildrenAndProps(propsWithChildren: Partial<Props & Children>) {
    const children: { [key: string]: Block | Block[] } = {};
    const props: { [key: string]: unknown } = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((x) => x instanceof Block)) {
          children[key] = value as Block[];
        }
      } else {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    });

    return { props, children } as { children: Children; props: Props };
  }

  get element() {
    return this.#element;
  }

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this.#element;
  }

  #makePropsProxy<T>(props: T) {
    // const self = this;

    return new Proxy(props as Record<string, unknown>, {
      get: (target, key: string) => {
        const value = target[key];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, key: string, value) => {
        if (target[key] != value) {
          this.#needUpdate = true;
          target[key] = value;
        }
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  #createDocumentElement(tagName: string): HTMLTemplateElement | HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this.#id);
    return element;
  }

  show() {
    // console.log('show Method');
    this.dispatchComponentDidMount();
    const content = this.getContent();

    if (content) {
      content.style.display = 'flex';
    }
  }

  hide() {
    // console.log('hide Method');
    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_UNM]);
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }
}

export default Block;

import EventBus from './eventBus/eventBus.ts';
import { EventEnum } from './eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers';

type ComponentChildren = {
  [key: string]: Block<object> | Block<object>[];
};

class Block<Props = object, Children extends ComponentChildren = {}> {
  static EVENTS: Record<EventEnum, EventEnum> = {
    [EventEnum.INIT]: EventEnum.INIT,
    [EventEnum.FLOW_CDM]: EventEnum.FLOW_CDM,
    [EventEnum.FLOW_CDU]: EventEnum.FLOW_CDU,
    [EventEnum.FLOW_UNM]: EventEnum.FLOW_UNM,
    [EventEnum.FLOW_RENDER]: EventEnum.FLOW_RENDER,
  } as const;

  readonly eventBus: () => EventBus;
  // readonly #meta: { tagName: string };
  readonly #id = uuid();
  #element: undefined | HTMLElement;
  #needUpdate = true;
  props: Props;
  children: Children;

  constructor(propsWithChildren: Props & Children) {
    const eventBus = new EventBus();
    const { props, children } = this.#getChildrenAndProps(propsWithChildren);

    this.props = this.#makePropsProxy(props);
    this.children = children;

    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);

    // this.#meta = {
    //   tagName,
    // };
    // this.#id = uuid();

    if (props?.withInternalID) {
      props._id = this.#id;
    }
    // this.children = <Record<string, Block>>this.#makePropsProxy(children);
    eventBus.emit(Block.EVENTS[EventEnum.INIT]);
  }

  #registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS[EventEnum.INIT], this.#init.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_CDM], this.#componentDidMount.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_CDU], this.#componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS[EventEnum.FLOW_RENDER], this.#render.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_UNM, this.#componentUnMount.bind(this));
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
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component.#id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child.#id}"></div>`;
      }
    });

    const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

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
    this.#addEvents();
  }

  render() {
    // return document.createElement('div');
    // + Переопределяется пользователем. Необходимо вернуть разметку +
    // так как он изменяемый снаружи, мы к нему обращаемся в #render
  }

  /** пока не реализовано */
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDM]);
  }
  #componentDidMount() {
    this.componentDidMount({});

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
  componentDidMount(_oldProps: Props) {}
  /** пока не реализовано конец */

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

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.#needUpdate) {
      this.#removeEvents();
      this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDU], oldProps, this.props);
      this.#needUpdate = false;
    }
  };

  #addEvents() {
    this.addEvents();
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.#element!.addEventListener(eventName, events[eventName]);
    });
  }

  #removeEvents() {
    this.removeEvents();
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.#element!.removeEventListener(eventName, events[eventName]);
    });
  }

  #getChildrenAndProps(propsWithChildren: Props & Children) {
    const children = {};
    const props = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((x) => x instanceof Block)) {
          // @ts-ignore
          children[key] = value;
        }
      } else {
        if (value instanceof Block) {
          // @ts-ignore
          children[key] = value;
        } else {
          // @ts-ignore
          props[key] = value;
        }
      }
    });

    return { children, props } as { children: Children; props: Props };
  }

  get element() {
    return this.#element;
  }

  // getContent(): HTMLElement {
  //   return this.#element!;
  // }

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

  #makePropsProxy(props: Props) {
    // const self = this;

    return new Proxy(props, {
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
    const res = this.getContent();

    if (res) {
      res.style.display = 'block';
    }
  }

  hide() {
    const res = this.getContent();

    if (res) {
      res.style.display = 'none';
    }
  }
}

export default Block;

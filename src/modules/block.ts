import EventBus from './eventBus/eventBus.ts';
import { EventEnum } from './eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers';

type Children = Record<string, Block<any>>;

class Block<P extends Record<string, any>> {
  static EVENTS: Record<EventEnum, EventEnum> = {
    [EventEnum.INIT]: EventEnum.INIT,
    [EventEnum.FLOW_CDM]: EventEnum.FLOW_CDM,
    [EventEnum.FLOW_CDU]: EventEnum.FLOW_CDU,
    [EventEnum.FLOW_UNM]: EventEnum.FLOW_UNM,
    [EventEnum.FLOW_RENDER]: EventEnum.FLOW_RENDER,
  } as const;

  readonly eventBus: () => EventBus;
  readonly #meta: { tagName: string };
  readonly #id: string;
  props: P;
  #element: undefined | HTMLElement;
  #needUpdate = true;
  children: Children;

  // /** JSDoc
  //  * @param {string} tagName
  //  * @param {Object} propsAndChildren
  //  *
  //  * @returns {void}
  //  */
  constructor(propsAndChildren: P) {
    //todo тут потом и events можно будет достать по идее
    const eventBus = new EventBus(); //todo <TEvents>
    const { props, children } = this.#getChildrenAndProps(propsAndChildren);

    this.props = this.#makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);

    // this.#meta = {
    //   tagName,
    // };

    this.#id = uuid();

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
    // console.log('#render', '- props', this.props);
    // const block = this.render();
    // console.log('111', block);
    //
    // this.#removeEvents();
    // this.#element!.innerHTML = block;
    //
    // // this.#element!.appendChild(block);
    //
    // this.#addEvents();

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
          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
        stub?.replaceWith(child.getContent());
      }
    });

    if (this.#element) {
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
  componentDidMount(oldProps) {}
  /** пока не реализовано конец */

  #componentDidUpdate(oldProps, newProps) {
    // console.log('#componentDidUpdate');
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (!needRerender) {
      return;
    }

    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_RENDER]);
  }

  componentDidUpdate(oldProps, newProps) {
    // console.log('componentDidUpdate', oldProps, newProps);
    // сравниваем пропсы, подумай потом над реализацией более глубокой (если надо)
    for (const propKey in newProps) {
      if (oldProps[propKey] !== newProps[propKey]) {
        return true;
      }
    }
    return false;
  }

  setProps = (nextProps) => {
    // console.log('setProps', nextProps, this.props);
    if (!nextProps) {
      return;
    }

    // this.#needUpdate = false;
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.#needUpdate) {
      // возможно его стоит не тут, а в анмаунте, но я пока не уверен
      this.#removeEvents();
      this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDU], oldProps, this.props);
      this.#needUpdate = false;
    }

    // this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_CDU], oldProps, this.props);

    /** перенёс флоурендер в компонент дид апдейт */
    // if (this.componentDidUpdate(oldProps, this.props)) {
    //   this.#removeEvents();
    //   this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    // }
  };

  #componentUnMount() {
    this.#removeEvents();
  }

  componentUnMount() {}

  /** Служебные */
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

  #getChildrenAndProps(propsAndChildren) {
    const children: Children = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((x) => x instanceof Block)) {
          children[key] = value;
        }
      } else {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    });

    // console.log('children-getChildrenAndProps:', children);
    // console.log('props-getChildrenAndProps:', props);

    return { children, props };
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

  #makePropsProxy(props: Record<string | symbol, P>) {
    // const self = this;

    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        // const oldTarget = { ...target };
        // // target[prop] = value;
        //
        // // self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        if (target[prop] != value) {
          this.#needUpdate = true;
          target[prop] = value;
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
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  compile(template: string, props: Record<string, string> = {}) {
    // console.log('compile handleBars');
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.#id}"></div>`;
    });

    const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
      stub.replaceWith(child.getContent());
    });

    return fragment.content;

    // return Handlebars.compile(template)(propsAndStubs);
  }
}

export default Block;


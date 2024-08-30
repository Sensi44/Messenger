import EventBus from './eventBus/eventBus.ts';
import { EventEnum } from './eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers';

type Children = Record<string, Block | Block[]>;

// type blur = {
//   // blur?: (e: FocusEvent) => void;
//   // onChange?: (e: unknown) => void;
//   // onChange?: (e: unknown) => void;
// };

type TEvents = MouseEvent | FocusEvent | SubmitEvent | InputEvent | Event;
type GenericObject = Record<string, string | number | boolean | undefined | Record<string, GenericObject[]>>;

interface BlockEvents {
  events?: Record<string, (e: TEvents) => void>;
}

type BlockKeyValue = Record<
  string,
  | string
  | number
  | Record<string, string>
  | string[]
  | Block
  | Block[]
  | (() => void)
  | boolean
  | Record<string, (e: MouseEvent) => void>
  | ((...args: unknown[]) => void)
  | GenericObject[]
  | ((e: FocusEvent) => void)
  | ((e: InputEvent) => void)
  | ((e: MouseEvent) => void)
>;

export type BlockProps = BlockKeyValue & BlockEvents;

class Block {
  static EVENTS: Record<EventEnum, EventEnum> = {
    [EventEnum.INIT]: EventEnum.INIT,
    [EventEnum.FLOW_CDM]: EventEnum.FLOW_CDM,
    [EventEnum.FLOW_CDU]: EventEnum.FLOW_CDU,
    [EventEnum.FLOW_UNM]: EventEnum.FLOW_UNM,
    [EventEnum.FLOW_RENDER]: EventEnum.FLOW_RENDER,
  } as const;

  readonly eventBus: () => EventBus;
  readonly #id: string;
  props: BlockKeyValue & BlockEvents;
  _events: BlockEvents;
  #element: undefined | HTMLElement;
  #needUpdate = true;
  children: Children;

  constructor(propsAndChildren: BlockProps) {
    const eventBus = new EventBus();
    const { props, children, events } = this.#getChildrenAndProps(propsAndChildren);

    this.props = this.#makePropsProxy(props);
    this.children = children;
    this._events = <Record<string, () => void>>this.#makePropsProxy(events);
    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);

    this.#id = uuid();

    if (props?.withInternalID) {
      props._id = this.#id;
    }
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
    this.#addEvents();
  }

  render() {}

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
  componentDidMount(_oldProps: BlockProps) {}
  /** пока не реализовано конец */

  #componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    // console.log('#componentDidUpdate');
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (!needRerender) {
      return;
    }

    this.eventBus().emit(Block.EVENTS[EventEnum.FLOW_RENDER]);
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    // console.log('componentDidUpdate', oldProps, newProps);
    // сравниваем пропсы, подумай потом над реализацией более глубокой (если надо)
    for (const propKey in newProps) {
      if (oldProps[propKey] !== newProps[propKey]) {
        return true;
      }
    }
    return false;
  }

  setProps = (nextProps: BlockProps) => {
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

  // #componentUnMount() {
  //   this.#removeEvents();
  // }

  componentUnMount() {}

  /** Служебные */
  #addEvents() {
    this.addEvents();
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (events[eventName] && this.#element) {
        this.#element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  #removeEvents() {
    this.removeEvents();
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.#element?.removeEventListener(eventName, events[eventName]);
    });
  }

  #getChildrenAndProps(propsAndChildren: BlockProps) {
    const children: Children = {};
    const props: BlockKeyValue & BlockEvents = {};
    const events: Record<string, () => void> = {};

    if (propsAndChildren.events) {
      Object.keys(propsAndChildren.events).forEach((key) => {
        if (propsAndChildren.events) {
          events[key] = <() => void>propsAndChildren.events[key];
        }
      });
    }

    Object.entries(propsAndChildren).forEach(([key, value]) => {
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

    return { children, props, events };
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

  #makePropsProxy(props: BlockProps) {
    // const self = this;

    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
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

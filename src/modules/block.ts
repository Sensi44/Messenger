import EventBus from './eventBus/eventBus.ts';
// import eventBus from './eventBus/eventBus.ts';
// import { EventEnum } from './eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers/uuid.ts';
import loginPage from '../pages/loginPage/loginPage.ts';

class Block {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_UNM: 'flow:component-un-mount',
    FLOW_RENDER: 'flow:render',
  } as const;

  readonly eventBus: () => EventBus;
  readonly #meta: { tagName: string };
  readonly #id: string;
  props: Record<string, string | number | object>;
  #element: undefined | HTMLElement;
  #needUpdate = true;
  children: Record<string, Block>;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsAndChildren
   *
   * @returns {void}
   */
  constructor(propsAndChildren = {}) {
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
    eventBus.emit(Block.EVENTS.INIT);
  }

  #registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
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
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
      propsAndStubs[key] = `<div data-id="${child.#id}"></div>`
    })

    const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
      stub?.replaceWith(child.getContent());
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
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  #componentDidMount() {
    // console.log('#componentDidMount -');
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }
  componentDidMount(oldProps) {}
  /** пока не реализовано конец */

  #componentDidUpdate(oldProps, newProps) {
    console.log('#componentDidUpdate');
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (!needRerender) {
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log('componentDidUpdate', oldProps, newProps);
    // сравниваем пропсы, подумай потом над реализацией более глубокой (если надо)
    for (const propKey in newProps) {
      if (oldProps[propKey] !== newProps[propKey]) {
        return true;
      }
    }
    return false;
  }

  setProps = (nextProps) => {
    console.log('setProps', nextProps, this.props);
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.#needUpdate) {
      // возможно его стоит не тут, а в анмаунте, но я пока не уверен
      this.#removeEvents();
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      //this.#needUpdate ?
    }

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
    console.log('слушатели добавлены', events);
    Object.keys(events).forEach((eventName) => {
      this.#element!.addEventListener(eventName, events[eventName]);
    });
  }

  #removeEvents() {
    this.removeEvents();
  }

  removeEvents() {
    const { events = {} } = this.props;
    console.log('слушатели удалены', events);
    console.log(events);
    // console.log('слушатели удалены');
    Object.keys(events).forEach((eventName) => {
      this.#element!.removeEventListener(eventName, events[eventName]);
    });
  }

  #getChildrenAndProps(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = <Block>value;
      } else {
        props[key] = value;
      }
    });
    // console.log('children-getChildrenAndProps:', children);
    // console.log('props-getChildrenAndProps:', props);

    return { children, props };
  }

  get element() {
    return this.#element;
  }

  getContent(): HTMLElement {
    return this.#element!;
  }

  #makePropsProxy(props: Record<string | symbol, string | number | object>) {
    const self = this;

    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        // if (target[prop] != value) {
        //   this.#needUpdate = true; // пока хз, это как-то надо по другому обрабатывать (обнулять)
        //   target[prop] = value;
        // }
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

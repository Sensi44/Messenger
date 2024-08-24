import EventBus from '../eventBus/eventBus.ts';
import eventBus from '../eventBus/eventBus.ts';
import { EventEnum } from '../eventBus/eventBus.types.ts';
import Handlebars from 'handlebars';
import { uuid } from '../helpers/uuid.ts';

class Block {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_UNM: 'flow:component-un-mount',
    FLOW_RENDER: 'flow:render',
  };

  readonly eventBus: () => eventBus;
  readonly #meta: { tagName: string };
  readonly #id: string;
  props: Record<string, string | number | object>;
  #element: undefined | HTMLElement;
  #needUpdate = true;
  #children: Record<string, Block>;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsAndChildren
   *
   * @returns {void}
   */
  constructor(tagName: string = 'div', propsAndChildren = {}) {
    //todo тут потом и events можно будет достать по идее
    const { props, children } = this.#getChildren(propsAndChildren);
    this.#children = children;

    const eventBus = new EventBus();

    this.#meta = {
      tagName,
    };

    this.#id = uuid();

    if (props?.withInternalID) {
      props._id = this.#id;
    }

    this.props = this.#makePropsProxy({ ...props });

    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);
    eventBus.emit(EventEnum.INIT);
  }

  #registerEvents(eventBus) {
    eventBus.on(EventEnum.INIT, this.init.bind(this));
    eventBus.on(EventEnum.FLOW_RENDER, this.#render.bind(this));
    eventBus.on(EventEnum.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(EventEnum.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(EventEnum.FLOW_UNM, this.#componentUnMount.bind(this));
  }

  _createResources() {
    const { tagName } = this.#meta;
    this.#element = this.#createDocumentElement(tagName);
  }

  /** Методы жизненного цикла компонента */

  init() {
    // console.log('init');
    this._createResources();
    this.eventBus().emit(EventEnum.FLOW_RENDER);
  }

  #render() {
    console.log('#render', '- props', this.props);
    const block = this.render();
    // Это небезопасный метод для упрощения логики.
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this.#element.innerHTML = block;

    this.#addEvents();
  }

  render() {
    // + Переопределяется пользователем. Необходимо вернуть разметку +
    // так как он изменяемый снаружи, мы к нему обращаемся в #render
  }

  /** пока не реализовано */
  dispatchComponentDidMount() {
    console.log('dispatchComponentDidMount -');
    // this._eventBus().emit(EventEnum.FLOW_CDM); - было так мб ошибка
    this.eventBus().emit(EventEnum.FLOW_CDM);
  }
  #componentDidMount() {
    console.log('#componentDidMount -');
    this.componentDidMount({});
  }
  componentDidMount(oldProps) {
    // console.log('componentDidMount', oldProps, this);
  }
  /** пока не реализовано конец */

  #componentDidUpdate(oldProps, newProps) {
    console.log('#componentDidUpdate');
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (needRerender) {
      this.eventBus().emit(EventEnum.FLOW_RENDER);
    }
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
    console.log('setProps', nextProps);
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.#needUpdate) {
      // возможно его стоит не тут, а в анмаунте, но я пока не уверен
      this.#removeEvents();
      this.eventBus().emit(EventEnum.FLOW_CDU, oldProps, this.props);
      //this.#needUpdate ?
    }

    /** перенёс флоурендер в компонент дид апдейт */
    // if (this.componentDidUpdate(oldProps, this.props)) {
    //   this.#removeEvents();
    //   this.eventBus().emit(EventEnum.FLOW_RENDER);
    // }
  };

  #componentUnMount() {
    this.#removeEvents();
  }

  componentUnMount() {}

  /** Служебные */
  #addEvents() {
    const { events = {} } = this.props;
    // console.log('слушатели добавлены');
    Object.keys(events).forEach((eventName) => {
      this.#element!.addEventListener(eventName, events[eventName]);
    });
  }

  #removeEvents() {
    const { events = {} } = this.props;
    // console.log('слушатели удалены');
    Object.keys(events).forEach((eventName) => {
      this.#element!.removeEventListener(eventName, events[eventName]);
    });
  }

  #getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = <Block>value;
      } else {
        props[key] = value;
      }
    });
    console.log('children-getChildren:', children);
    console.log('props-getChildren:', props);

    return { children, props };
  }

  get element() {
    return this.#element;
  }

  getContent(): HTMLElement {
    console.log('getContent');
    return this.#element!;
  }

  #makePropsProxy(props: Record<string, string | number | object>) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // const self = this;
    // Здесь вам предстоит реализовать метод
    // return props;
    return new Proxy(props, {
      get: (target, prop) => {
        const propValue = target[prop];
        return typeof propValue === 'function' ? propValue.bind(target) : propValue;
      },
      set: (target, prop, value) => {
        if (target[prop] != value) {
          this.#needUpdate = true; // пока хз, это как-то надо по другому обрабатывать (обнулять)
          target[prop] = value;
        }
        return true;
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

    Object.entries(this.#children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.#id}"></div>`;
    });

    // const fragment = this.#createDocumentElement('template') as HTMLTemplateElement;
    // fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    //
    // Object.values(this.#children).forEach((child) => {
    //   const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
    //   stub.replaceWith(child.getContent());
    // });
    //
    // return fragment.content;

    return Handlebars.compile(template)(propsAndStubs);
  }
}

export default Block;

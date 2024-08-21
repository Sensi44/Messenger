import EventBus from '../eventBus/eventBus.ts';
import { EventEnum } from '../eventBus/eventBus.types.ts';
import eventBus from '../eventBus/eventBus.ts';
import Handlebars from 'handlebars';

class Block {
  // Нельзя создавать экземпляр данного класса
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_UNM: 'flow:component-un-mount',
    FLOW_RENDER: 'flow:render',
  };

  readonly eventBus: () => eventBus;
  props: Record<string, string | number | object>;
  private readonly _meta: { tagName: string };
  private _element: undefined | HTMLElement;
  needUpdate = false;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: string = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EventEnum.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(EventEnum.INIT, this.init.bind(this));
    eventBus.on(EventEnum.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EventEnum.FLOW_CDM, this._componentDidMount.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    console.log('init - инициализация');
    this._createResources();
    this.eventBus().emit(EventEnum.FLOW_RENDER);
  }

  _componentDidMount() {
    console.log('_componentDidMount', this._element);
    this.componentDidMount({});
  }

  componentDidMount(oldProps) {
    // console.log('componentDidMount', oldProps, this);
  }

  dispatchComponentDidMount() {
    console.log('dispatchComponentDidMount метод');
    // this._eventBus().emit(EventEnum.FLOW_CDM); - было так мб ошибка
    this.eventBus().emit(EventEnum.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    console.log(1);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log('componentDidUpdate', oldProps, newProps);
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.componentDidUpdate(oldProps, this.props)) {
      this.eventBus().emit(EventEnum.FLOW_RENDER);
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log('_render', this.props);
    const block = this.render();
    // Это небезопасный метод для упрощения логики.
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

  render() {
    // + Переопределяется пользователем. Необходимо вернуть разметку +
    // так как он изменяемый снаружи, мы к нему обращаемся в _render
  }

  getContent(): HTMLElement {
    console.log('getContent');
    return this.element!;
  }

  _makePropsProxy(props: Record<string, string | number | object>) {
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
          this.needUpdate = true; // пока хз, это как-то надо по другому обрабатывать (обнулять)
          target[prop] = value;
        }
        return true;
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement | HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  compile(template: string, context: Record<string, string> = {}) {
    const templateFunction = Handlebars.compile(template)(context);
    return templateFunction;
  }
}

export default Block;

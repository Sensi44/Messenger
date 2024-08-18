import EventBus from '../eventBus/eventBus.ts';
import { EventEnum } from '../eventBus/eventBus.types.ts';
import loginPage from '../pages/loginPage/loginPage.ts';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;

  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EventEnum.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    console.log('init');
    this._createResources();
    this.eventBus().emit(EventEnum.FLOW_RENDER);
  }

  _componentDidMount() {
    console.log('_componentDidMount');
    this.componentDidMount({});
  }

  componentDidMount(oldProps) {
    console.log('componentDidMount', oldProps, this);
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

  // + Переопределяется пользователем. Необходимо вернуть разметку +
  render() {}

  getContent() {
    console.log('getContent');
    return this.element;
  }

  _makePropsProxy(props) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    // Здесь вам предстоит реализовать метод
    return props;
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;

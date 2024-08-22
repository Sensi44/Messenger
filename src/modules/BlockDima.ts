import { EventBus } from './eventBus';
import makeUUID from '../helpers/makeUUID';
import Handlebars from 'handlebars';
import { Router } from './router';
import { IUserInfo } from '../types/user';
import { ICurrentChat } from '../types/chat';
import { WSTransport } from './WSTransport';

interface BlockAttr {
  attr?: Record<string, string>;
}

interface BlockEvents {
  events?: Record<string, (e: any) => void>;
}

type BlockKeyValue = Record<
  string,
  string | Record<string, string> | Block | Block[] | (() => void) | boolean | Record<string, (e: any) => void>
>;

export type BlockProps = BlockKeyValue & BlockAttr & BlockEvents;

interface IGlobalState {
  router?: Router;
  user?: IUserInfo;
  currentChat?: ICurrentChat;
  socket?: WSTransport;
}

interface IPropsDefault {
  attr: {
    class: string;
  };
}

type IProps = Record<string, string> & IGlobalState & IPropsDefault;

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_UNM: 'flow:component-un-mount',
  };

  private _element: HTMLElement | undefined;
  private readonly _meta: { tagName: string };
  protected props: IProps;
  private readonly eventBus: () => EventBus;

  _children: Record<string, Block>;
  _list: Record<string, Block[]>;
  _events: Record<string, () => void>;
  _id: string;
  _setUpdate: boolean = false;

  constructor(tagName: string = 'div', propsAndChildren: BlockProps = {}) {
    const { props, children, list, events } = this.getChildren(propsAndChildren);
    this._id = makeUUID();
    const eventBus = new EventBus();

    this._meta = {
      tagName,
    };

    this._children = <Record<string, Block>>this._makePropsProxy(children);
    this._list = <Record<string, Block[]>>this._makePropsProxy(list);

    this._events = <Record<string, () => void>>this._makePropsProxy(events);
    this.props = <IProps>this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = () => eventBus;
    this._registerEvents(this.eventBus());
    this.eventBus().emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UNM, this._componentUnMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.dispatchComponentDidMount();
  }

  _componentDidMount() {
    this.addEvents();

    Object.values(this._children).forEach((child) => {
      child.componentDidMount();
    });
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    if (Object.keys(this._children).length) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    for (const nextPropsKey in newProps) {
      if (!oldProps[nextPropsKey] || oldProps[nextPropsKey] !== newProps[nextPropsKey]) {
        return true;
      }
    }

    return false;
  }

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._element!.innerHTML = '';
    this._element!.appendChild(block);
    this.addAttribute();
  }

  render(): Node {
    return document.createElement('div');
  }

  addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element!.addEventListener(eventName, this._events[eventName]);
    });
  }

  removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, this._events[eventName]);
    });
  }

  addAttribute() {
    const { attr = {} } = this.props;
    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === 'string') {
        this._element!.setAttribute(key, value);
      }
    });
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this.props };

    const { children, props, list } = this.getChildren(nextProps);
    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (Object.values(list).length) {
      Object.assign(this._list, list);
    }

    if (this._setUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  };

  private _makePropsProxy(props: Record<string | symbol, string | number | object>) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        if (target[prop] != value) {
          this._setUpdate = true;
          target[prop] = value;
        }
        return true;
      },
      // deleteProperty: () => {
      //   throw new Error('Нет доступа');
      // },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    return document.createElement(tagName);
  }

  getChildren(propsAndChildren: BlockProps) {
    const children: Record<string, Block> = {};
    const props: Record<string, string> = {};
    const list: Record<string, Block[]> = {};
    const events: Record<string, () => void> = {};

    if (propsAndChildren.events) {
      Object.keys(propsAndChildren.events).forEach((key) => {
        if (propsAndChildren.events) {
          events[key] = <() => void>propsAndChildren.events[key];
        }
      });
    }
    Object.keys(propsAndChildren).forEach((key) => {
      if (propsAndChildren[key] instanceof Block) {
        children[key] = <Block>propsAndChildren[key];
      } else if (Array.isArray(propsAndChildren[key])) {
        list[key] = <Block[]>propsAndChildren[key];
      } else {
        props[key] = <string>propsAndChildren[key];
      }
    });

    return { children, props, list, events };
  }

  compile(template: string, props: Record<string, string> = {}) {
    if (typeof props !== 'undefined') {
      props = this.props;
    }
    const propsAndStubs = { ...props };
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id='${child._id}'></div>`;
    });
    Object.entries(this._list).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id='__l_${key}'></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });
    Object.entries(this._list).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`);
      if (!stub) {
        return;
      }

      const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

      child.forEach((item) => {
        listContent.content.append(item.getContent());
      });

      stub.replaceWith(listContent.content);
    });
    return fragment.content;
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  _componentUnMount() {
    this.removeEvents();

    Object.values(this._children).forEach((child) => {
      child._componentUnMount();
    });
  }

  componentDidMount() {}
  componentUnMount() {}

  hide() {
    this.eventBus().emit(Block.EVENTS.FLOW_UNM);

    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}

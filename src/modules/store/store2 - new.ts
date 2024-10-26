import { ChatsResponse, Message, SomeObject, UserInfo } from '../../types/commonTypes.ts';
import getStore from '../../utils/get.ts';
import setStore from '../../utils/set.ts';
import EventBus from '../eventBus/eventBus.ts';

type StoreStateType = {
  chats: ChatsResponse[];
  profileData: UserInfo | null;
  currentChat: ChatsResponse | null;
  messages: Message[];
};

const defaultStore: StoreStateType = {
  messages: [],
  chats: [],
  currentChat: null,
  profileData: null,
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export default class Store2New extends EventBus {
  private static __instance: Store2New | null = null;
  static EVENT_UPDATE = '1';

  static STORE_NAME = 'spaceСhatStore';

  _state: SomeObject = defaultStore;

  constructor() {
    if (Store2New.__instance) {
      return Store2New.__instance;
    }

    super();

    const savedState = localStorage.getItem(Store2New.STORE_NAME);

    this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};

    Store2New.__instance = this;

    this.on(Store2New.EVENT_UPDATE, () => {
      localStorage.setItem(Store2New.STORE_NAME, JSON.stringify(this._state));
    });
  }

  removeState() {
    this._state = defaultStore;
    this.emit(Store2New.EVENT_UPDATE);
  }

  getState(): SomeObject {
    return this._state;
  }

  /** Устанавливает значение в стор по указанному пути */
  set(patch: string, valueProp: unknown) {
    this._state = setStore(this._state, patch, valueProp);
    this.emit(Store2New.EVENT_UPDATE);
    return this;
  }

  /** Получает значение из стора по указанному пути */
  get(patch: string): unknown {
    return getStore(this._state, patch);
  }
}



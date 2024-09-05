import EventBus from './eventBus/eventBus.ts';

export enum StoreEvents {
  Updated = 'Updated',
}

export class Store extends EventBus {
  private static __instance: Store | null = null;

  private state = {};

  constructor(defaultState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

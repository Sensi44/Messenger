import { EventEnum } from './eventBus.types.ts';

class EventBus {
  // Словарь слушателей: ключ - событие, значение - массив обработчиков
  private readonly listeners: { [key in EventEnum]?: Array<(...args: any[]) => void> } = {};

  constructor() {
    this.listeners = {};
  }

  on(event: EventEnum, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: EventEnum, callback: (...args: any[]) => void) {
    const eventListeners = this.listeners[event];

    if (!eventListeners) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = eventListeners.filter((listener) => listener !== callback);
  }

  emit(event: EventEnum, ...args: unknown[]) {
    const eventListeners = this.listeners[event];

    if (!eventListeners) {
      throw new Error(`Нет события: ${event}`);
    }

    eventListeners.forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;

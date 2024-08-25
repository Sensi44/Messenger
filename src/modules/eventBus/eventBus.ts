import { EventEnum } from './eventBus.types.ts';

class EventBus {
  // listeners: { [key in EventEnum]?: Array<(...args: any[]) => void> } = {};
  listeners = {};

  constructor() {
    this.listeners = {};
  }

  on(event, callback: (data: string) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  log() {
    console.log(this.listeners);
  }
}

export default EventBus;

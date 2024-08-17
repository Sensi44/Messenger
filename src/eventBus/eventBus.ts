import { EventEnum } from './eventBus.types.ts';

class EventBus {
  listeners = {};

  constructor() {
    this.listeners = {};
  }

  on(event: EventEnum, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: EventEnum, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: EventEnum, ...args) {
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

const eventBus = new EventBus();

export default eventBus;

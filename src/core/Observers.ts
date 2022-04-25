import deepComparation from "./utils/deepComparation";
import isDev from "./utils/isDev";

class Observers {
  private observers: Map<string, Record<string, unknown>[]>;

  constructor() {
    this.observers = new Map();
  }

  subscribe<ObserverType = Record<string, unknown>>(
    key: string,
    newObserver: ObserverType,
  ): void {
    const observers = this.observers.get(key);

    if (!observers) {
      this.observers.set(key, [newObserver as Record<string, unknown>]);
      return;
    }

    const observerExists = observers.find(observer => (
      deepComparation(observer, newObserver as Record<string, unknown>)
    ));

    if (observerExists) {
      isDev() && console.log(`[INFO]: the observer ${newObserver}, present in ${key} already exists`);
      return;
    }

    observers.push(newObserver as Record<string, unknown>);
  }

  unsubscribe(key: string, observer: Record<string, unknown>): void {
    const observers = this.observers.get(key);

    if (observers && observers.length > 0) {
      const filteredObservers = observers.filter(existingObserver => (
        deepComparation(observer, existingObserver)
      ));

      this.observers.set(key, filteredObservers);
    }
  }

  getFromKey<ObserversType = Record<string, unknown>[]>(key: string): ObserversType {
    const observers = this.observers.get(key);

    return (observers ?? []) as unknown as ObserversType;
  }
}

export default new Observers();

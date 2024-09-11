import Route from './route.ts';
import Block from '../block.ts';

export interface PageComponent<P extends Record<string, unknown> = Record<string, unknown>> {
  new (props: P): Block<P>;
}

class Router {
  private static __instance: Router | null = null;

  routes: Route[] = [];
  history!: History;
  private _currentRoute: Route | null = null;
  private _errorRoute: Route | null = null; // Хранение страницы ошибки
  readonly _rootQuery: string = 'app';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: PageComponent) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  error(block: PageComponent) {
    this._errorRoute = new Route('*', block, { rootQuery: this._rootQuery });
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget;
      if (target) {
        this._onRoute((target as Window).location.pathname);
      }
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    // console.log(route);
    if (!route) {
      console.log(this._currentRoute);
      this._currentRoute?.leave();
      if (this._errorRoute) {
        this._errorRoute.render();
        return;
      }
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route: Route) => route.match(pathname));
    return route || null; // Возвращаем null, если маршрут не найден
  }
}

export default Router;

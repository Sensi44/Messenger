import Block from '../../modules/block';

type ILinkProps = {
  url: string;
  class?: string;
  text: string;
  dataAttr?: string;
  events: {};
};

type ILinkChildren = {};

class Link extends Block<Partial<ILinkProps>, ILinkChildren> {
  constructor(props: Partial<ILinkProps> & ILinkChildren) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          window.router.go(props.url || '/');
        },
      },
    });
  }

  render() {
    return `
      <a href={{url}} data-page={{url}} class="{{class}}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;

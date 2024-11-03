import Block from '../../modules/block';

type ILinkProps = {
  url: string;
  class?: string;
  text: string;
  dataAttr?: string;
  events: {
    click?: (e: MouseEvent) => void;
  };
};

type ILinkChildren = {};

class Link extends Block<Partial<ILinkProps>, ILinkChildren> {
  constructor(props: Partial<ILinkProps> & ILinkChildren) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          if (props.events?.click) {
            props.events['click'](e);
          }
          window.router.go(props.url || '/');
        },
      },
    });
  }

  render() {
    console.log(1);
    return `
      <a href={{url}} data-page={{url}} class="{{class}}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;

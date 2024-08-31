import Block from '../../modules/block';

// import type { ILink } from './link.types.ts';

type ILinkProps = {
  url: string;
  class?: string;
  text: string;
  dataAttr?: string;
};

type ILinkChildren = {};

class Link extends Block<ILinkProps, Partial<ILinkChildren>> {
  render() {
    return `
      <a href={{url}} data-page={{url}} class="{{class}}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;

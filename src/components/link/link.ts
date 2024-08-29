import Block from '../../modules/block';

import type { ILink } from './link.types.ts';

class Link extends Block<ILink> {
  constructor(props: ILink) {
    super(props);
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

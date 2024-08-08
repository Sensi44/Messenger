import './typography.scss';

interface TypographyContext {
  hash: {
    as: string,
    style: string,
    className?: string
  },
  fn: (arg: any) => string
}

export function Typography(context: TypographyContext) {
  const { as: tagName, style, className = '' } = context.hash;
  // const content = context.fn(this);
  const content = context.fn({ tagName, style, className });
  return `<${tagName} class="viChat ${style} ${className}">${content}</${tagName}>`;
}
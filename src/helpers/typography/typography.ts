import './typography.scss';

interface TypographyContext {
  hash: {
    as: string;
    style: string;
    className?: string;
  };
  fn: (arg: unknown) => string;
}

export function Typography(this: Record<string, unknown>, context: TypographyContext) {
  const { as: tagName = 'p', style, className = '' } = context.hash;
  const content = context.fn(this);

  return `<${tagName} class="${style} ${className}">${content}</${tagName}>`;
}

import Handlebars from 'handlebars';

export function compile(template: string, context: object): string {
  const templateFunction = Handlebars.compile(template);
  return templateFunction(context);
}

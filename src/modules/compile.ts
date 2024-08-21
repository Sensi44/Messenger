import Handlebars from 'handlebars';

export function compile(template: string, context: Record<string, string> = {}): string {
  const templateFunction = Handlebars.compile(template)(context);
  return templateFunction;
}

// устаревшее - удалить - перенёс в block

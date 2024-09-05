function trim(str: string, chars: string | undefined = undefined) {
  const pattern = chars ? new RegExp(`^[${chars}]+|[${chars}]+$`, 'g') : /^\s+|\s+$/g;

  return str.replace(pattern, '');
}

trim('  abc  '); // => 'abc'
trim('-_-abc-_-', '_-'); // => 'abc'
trim('\xA0foo'); // "foo"
trim('\xA0foo', ' '); // " foo"
trim('-_-ab c -_-', '_-'); // ab c

['  foo  ', '  bar  '].map((value) => trim(value)); // => ['foo', 'bar']

// Этот метод удобно использовать для данных, которые заполняет пользователь.
// Теперь борьба со случайными опечатками стала ещё проще.
// Авторское решение https://playcode.io/874519/

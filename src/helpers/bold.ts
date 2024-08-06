export function bold(options){
  return '<div class="mybold">' + options.fn(this) + '</div>';
}
export function GetEditType(edit: string, editType: string) {
  if (edit) {
    return editType === 'data';
  }
  return false;
}



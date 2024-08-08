export function GetEditType(edit, editType) {
  console.log(edit, editType);
  if (edit) {
    return editType === 'data'
  }
  return false;
}
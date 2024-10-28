export const formatLastMessageTime = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Получаем день
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (0-11, поэтому +1)
  const hours = String(date.getHours()).padStart(2, '0'); // Часы
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты

  return `${day}.${month} | ${hours}:${minutes}`;
}

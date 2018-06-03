export const formatTime = (strDate) => {
  const date = new Date(strDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

export const sortOnlineStatus = users => (
  users.sort((a, b) => b.onlineStatus - a.onlineStatus)
);

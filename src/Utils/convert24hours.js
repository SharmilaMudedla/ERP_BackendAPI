const convertTo24Hour = (time12h) => {
  time12h = time12h.trim().toUpperCase();
  const regex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/;
  const match = time12h.match(regex);
  if (!match) throw new Error("Invalid time format");

  let [, hours, minutes, meridian] = match;
  hours = parseInt(hours, 10);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  }
  if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes;
  return `${hh}:${mm}:00`;
};

export default convertTo24Hour;

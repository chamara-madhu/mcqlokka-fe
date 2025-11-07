export const isValidEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


export const formatTimeSpent = (seconds) => {
  // Ensure it's a valid number
  const totalSeconds = Number(seconds);

  if (isNaN(totalSeconds) || totalSeconds < 0) return "0m 0s";

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
};

export function calculateTotalAmount(count) {
  if (count <= 0) return 0;

  switch (count) {
    case 1:
      return 990;
    case 2:
      return 1690;
    case 3:
      return 2190;
    default:
      // Rs. 2190 for first 3 subjects + Rs. 590 for each additional
      return 2190 + (count - 3) * 590;
  }
}


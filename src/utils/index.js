export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (list, callback) => {
  const promises = list.map((item) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = item;

      img.onload = () => {
        resolve(true);
      };

      img.onerror = () => {
        resolve(false);
      };
    });
  });

  Promise.all(promises).then((values) => {
    if (values.every((value) => value === true)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};
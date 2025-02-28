export const humanizeNumber = (num: number) => {
  if (num < 1000) return num.toString();

  const units = ['K', 'M', 'B', 'T'];
  let unitIndex = -1;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length - 1) {
    formattedNum /= 1000;
    unitIndex++;
  }

  return `${formattedNum.toFixed(2)}${units[unitIndex]}`;
};

export const humanizeEther = (num: number | bigint) => {
  const decimals = 18;
  const value = Number(num) / 10 ** decimals;
  return humanizeNumber(value);
};

export const formatTime = (time: number) => {
  if (time <= 0) return null;
  // format in xh xm
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${hours}h ${minutes}m`;
};
